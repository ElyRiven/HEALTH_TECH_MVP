FROM node:22-alpine

WORKDIR /app

RUN apk update && apk upgrade --no-cache

COPY package.json package-lock.json ./

RUN npm ci --omit=dev && \
    npm cache clean --force && \
    rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /root/.npm

COPY src/ ./src/

EXPOSE 3000

CMD ["node", "src/index.js"]
