FROM node:alpine AS development

WORKDIR /use/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

RUN npm run build

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /use/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

COPY --from=development /use/src/app/dist ./dist

CMD ["node", "dist/main"]