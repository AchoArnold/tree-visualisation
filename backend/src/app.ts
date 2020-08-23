import express, { NextFunction, Request, Response } from 'express';
import { AppContainer } from './Container/AppContainer';
import keys from './keys';
import responseTime from 'response-time';
import cors from 'cors';
import exp from 'constants';

const app = express();
const port = keys.APP_PORT;
const container = new AppContainer(keys);
const logger = container.logger();

/**
 * Middlewares
 */
app.use(
    responseTime((req: Request, res: Response, time: number) => {
        logger.info({
            method: req.method,
            originalUrl: req.originalUrl,
            responseTime: time
        });
    })
);

app.use(cors());

/**
 * Routes Definitions
 */
app.get('/', container.itemsController().index());

/**
 * Server Activation
 */
const server = app.listen(port, () => {
    logger.info('Listening on port:', port);
});

/**
 * Shutdown handler
 */
const shutDown = () => {
    server.close(async () => {
        logger.info('Closed out remaining connections');

        await container.databaseConnection().neo4j().close();
        logger.info('Closed database driver');

        process.exit(0);
    });

    setTimeout(() => {
        logger.error(
            'Could not close connections in time, forcefully shutting down'
        );
        process.exit(1);
    }, 10000);
};

/**
 * Shutting down
 */
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

export default server;
