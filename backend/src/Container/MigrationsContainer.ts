import { ItemsMigrator } from '../Migrations/ItemsMigrator';
import { BaseContainer } from './BaseContainer';
import Logger from 'bunyan';
import { TruncateMigrator } from '../Migrations/TruncateMigrator';

export class MigrationsContainer extends BaseContainer {
    ItemsMigrator(): ItemsMigrator {
        return new ItemsMigrator(
            this.databaseConnection().neo4j(),
            this.Logger()
        );
    }

    TruncateMigrator(): TruncateMigrator {
        return new TruncateMigrator(
            this.databaseConnection().neo4j(),
            this.Logger()
        );
    }

    Logger(): Logger {
        return Logger.createLogger({
            name: 'migrations'
        });
    }
}
