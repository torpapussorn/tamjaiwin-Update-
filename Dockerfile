FROM node:12-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn --silent
RUN yarn build

FROM node:12-alpine AS modules
WORKDIR /app
COPY ./package.json ./package.json
RUN yarn --silent --production

FROM mhart/alpine-node:slim-12
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src/pages ./pages
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=modules /app/node_modules ./node_modules

CMD [ "node", "dist/index.js", "--color=16m" ]
