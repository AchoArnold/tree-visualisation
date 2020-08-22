FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN mv .env.example .env

RUN npm install

## Add the wait script to the image
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it
RUN chmod +x /wait-for-it

EXPOSE 8000

## Launch the wait tool and then your application
CMD /wait-for-it -t 15 http://neo4j:7474 -- echo "neo4j is up" && npm run migrate && npm run start