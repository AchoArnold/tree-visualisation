# Backend

The backend is done completely in Typescript, and I run it using [ts-node](https://github.com/TypeStrong/ts-node) so I don't compile the typescript to javascript before running it with node.js. Since the DB uses neo4j, I setup the DB using a docker container. It can be done by using a free [neo4j sandbox instance](https://sandbox.neo4j.com/). The `.env` variables will need to be configured properly.

## Code Walkthrough

The code is found in the `./src` directory. I created  basic container found in `./src/Containers` for both the application and the migration since they run differently.

I called the nodes in the graph `Item` since I couldn't find a better name.

The app has one controller and when a user visits `/` they get routed the `index` controller which returns `all`  the items in the database.


For the migration. Each migration file extends the `Migrator` class and the `src/Migration/index.ts` file runs the migration. The list of migrations to run is stored in the `itemsToMigrate` array. And the migration just loops through all the migrators in this array calling the `migrate()` method in each migrator.

**NOTE** I clear the database before running each migration. This is just a hack for ease. To setup the application in production, There should be an extra DB table which tracks the migrations that have already been run such that when you start the application, It runs only migrations that have not yet been run.


## Setup

### Environment variables

The environment variables should be configured using the `.env` file. I added template called `.env.example` which contains the `.env` variables. You need to copy `.env.example` into `.env` and set the variables correctly.

```bash
mv .env.example .env
```

### Installation

The dependencies can be installed using the command below

```bash
npm install
```

### Migration

The migration command below imports the items from `https://gist.github.com/hurkanakbiyik/5d54addf62f2c4a59c1e9222e3dc2d08` into the neo4j database

**NOTE:** The migration command clears the entire database before inserting the new items into the database.

```bash
npm run migrate
```

### Running the Application

**NOTE:** Make sure you run the migration and you have configured your .env variable correctly before starting the application. The command below starts the application and exposes it on the `APP_PORT` variable in the `.env` file. The default URL is [http://localhost:8000](http://localhost:8000) so make sure the port `8000` is free.

```bash
npm run start
```

### Testing

There's only one e2e test which tests that the api responds with the correct set of items.

**NOTE:** Before running the test, make sure the migration has already been done because e2e test actually calls the API and it will fail if the migration hasn't been done. So ideally run `npm run migrate` before running the test.

```bash
npm run test
```

### Lints and fixes files

I used ts-lint for linting, You can run the linter using the command below

```bash
npm run lint
```
