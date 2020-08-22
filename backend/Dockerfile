FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN mv .env.example .env

RUN npm install

RUN npm run migrate

EXPOSE 8000

CMD [ "npm", "run", "start" ]