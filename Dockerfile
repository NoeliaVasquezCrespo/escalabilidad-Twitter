FROM node:12.22.1-alpine3.11
ENV NODE_ENV=production

WORKDIR /app

COPY . . 

RUN yarn install --production



CMD [ "node", "/app/index.js","/app/redis-commander" ]

