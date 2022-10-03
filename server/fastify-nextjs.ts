import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import next from 'next';
import { createGzip } from 'zlib';
import { SitemapStream, streamToPromise } from 'sitemap';
import { readFileSync } from 'fs';
import { join } from 'path';
import { hostname, useRobot as useRobot } from './load-env';

let sitemap: Buffer | undefined = undefined;
let robots: string | undefined = undefined;

export const fastifyNextjs = function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions & { dev: boolean },
  done: (err?: Error) => void
) {
  const { dev } = opts;
  const app = next({ dev });
  const handle = app.getRequestHandler();

  app
    .prepare()
    .then(() => {
      if (dev) {
        fastify.get('/_next/*', async (req, reply) => {
          await handle(req.raw, reply.raw);
          reply.sent = true;
        });
      }

      fastify.get('/robots.txt', async (_, reply) => {
        if (!useRobot) {
          return reply.type('text/plain').send('User-agent: *\nDisallow: /');
        }
        if (!robots) {
          robots = readFileSync(
            join(process.cwd(), '/public/robots.txt'),
            'utf8'
          );
        }
        reply.type('text/plain').send(robots);
      });

      fastify.get('/sitemap.xml', async (_, reply) => {
        if (sitemap) {
          reply.headers({
            'Content-Type': 'application/xml',
            'Content-Encoding': 'gzip',
          });
          return reply.send(sitemap);
        }

        try {
          const stream = new SitemapStream({ hostname });
          const pipeline = stream.pipe(createGzip());
          stream.write({ url: '/', changefreq: 'monthly', priority: 1 });
          streamToPromise(pipeline).then(sm => (sitemap = sm));
          stream.end();
          pipeline.pipe(reply.raw).on('error', e => {
            throw e;
          });
          reply.raw.setHeader('Content-Type', 'application/xml');
          reply.raw.setHeader('Content-Encoding', 'gzip');
        } catch (error) {
          console.error(error);
          reply.code(500).send();
        }
      });

      fastify.all('/*', async (req, reply) => {
        await handle(req.raw, reply.raw);
        reply.sent = true;
      });

      fastify.setNotFoundHandler(async (req, reply) => {
        await app.render404(req.raw, reply.raw);
        reply.sent = true;
      });
      done();
    })
    .catch(err => {
      done(err);
    });
};

export default fastifyNextjs;
