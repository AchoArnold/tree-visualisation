## Intro

I separated the code for the frontend and the backend but you can run everything using the magic of docker as show below.

This is implemented using the single page application architecture, The frontend is done with Vue.js. The backend is done using express.js and It uses neo4j for the database.

### Links

Frontend: [http://localhost:8080](http://localhost:8080)

Backend: [http://localhost:8000](http://localhost:8000)

Neo4j: [http://localhost:7474/browser/](http://localhost:7474/browser/)

## Setup

### With Docker

If you have docker and docker-compose installed, You can build and run the application directly by using the command

```bash
docker-compose up --build
```

This will build both the frontend and the backend and you'll be able to test the application using the links in the section above.

#### Backend [![Actions Status](https://github.com/AchoArnold/tree-visualisation/workflows/Backend/badge.svg)](https://github.com/AchoArnold/tree-visualisation/actions)

See [backend/README.md](./backend/README.md)

#### Frontend [![Actions Status](https://github.com/AchoArnold/tree-visualisation/workflows/Frontend/badge.svg)](https://github.com/AchoArnold/tree-visualisation/actions)

see [frontend/README.md](./frontend/README.md)

#### CI/CD

I setup a gitlab action to run the tests for both the frontend and backend on push. See [Actions](./actions)