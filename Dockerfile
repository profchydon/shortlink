FROM node:12.13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install 

COPY . .

RUN yarn run build

RUN yarn run test

EXPOSE 3000

CMD [ "yarn", "run", "start"]