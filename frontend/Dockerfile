FROM node:latest as node

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:latest

RUN cat /etc/nginx/nginx.conf

COPY --from=node /usr/src/app/dist/ /usr/share/nginx/html

EXPOSE 80