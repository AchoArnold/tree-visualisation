import { ItemsMigrator } from '../Migrations/ItemsMigrator';
import { BaseContainer } from './BaseContainer';
import Logger from 'bunyan';
import { TruncateMigrator } from '../Migrations/TruncateMigrator';

export class MigrationsContainer extends BaseContainer {
    itemsMigrator(): ItemsMigrator {
        return new ItemsMigrator(
            this.databaseConnection().neo4j(),
            this.logger()
        );
    }

    truncateMigrator(): TruncateMigrator {
        return new TruncateMigrator(
            this.databaseConnection().neo4j(),
            this.logger()
        );
    }

    logger(): Logger {
        return Logger.createLogger({
            name: 'migrations'
        });
    }
}
