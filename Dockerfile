FROM docker.io/node:24.16.0-alpine3.24

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY index.js /app/index.js
COPY . .

RUN npm ci
RUN npm run build

CMD ["npm", "run", "start"]