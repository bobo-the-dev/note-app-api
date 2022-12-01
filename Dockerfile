FROM node:lts-alpine

WORKDIR /usr/local/app

COPY ./ /usr/local/app

RUN npm install

EXPOSE 3000

CMD [ "node", "main.js" ]