import { Migrator } from './Migrator';
import { Driver } from 'neo4j-driver';
import bunyan from 'bunyan';

export class TruncateMigrator implements Migrator {
    dbConnection: Driver;
    logger: bunyan;

    constructor(dbConnection: Driver, logger: bunyan) {
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
