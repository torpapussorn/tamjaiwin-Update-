import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import proxy from 'fastify-http-proxy';
import { proxyRules } from './load-env';

export const fastifyProxy = function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions & {},
  done: (err?: Error) => void
) {
  for (const rule of proxyRules) {
    if (!rule.upstream) continue;
    fastify.register(proxy, rule);
  }
  done();
};

export default fastifyProxy;
