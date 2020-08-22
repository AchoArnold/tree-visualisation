import express, { NextFunction, Request, Response } from 'express';
import { AppContainer } from './Container/AppContainer';
import envKeys from './keys';
import responseTime from 'response-time';

const app = express();
const port = envKeys.APP_PORT;
const container = new AppContainer(envKeys);
const logger = container.Logger();

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

/**
 * Routes Definitions
 */
app.get('/', container.ItemsController().index());

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
