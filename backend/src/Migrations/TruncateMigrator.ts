import { Migrator } from './Migrator';
import { Driver } from 'neo4j-driver';
import Logger from 'bunyan';

export class TruncateMigrator implements Migrator {
    dbConnection: Driver;
    logger: Logger;

    constructor(dbConnection: Driver, logger: Logger) {
        this.dbConnection = dbConnection;
        this.logger = logger;
    }

    /**
     * This migration clears the entire database.
     */
    async migrate(): Promise<void> {
        const session = this.dbConnection.session();
        try {
            await session.run('MATCH (n) DETACH DELETE n');
        } catch (e) {
            this.logger.error(e);
        } finally {
            await session.close();
        }
    }
}
