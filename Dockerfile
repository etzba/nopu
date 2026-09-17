FROM docker.io/node:24.16.0-alpine3.24

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci
RUN npm run build

CMD ["npm", "run", "start"]