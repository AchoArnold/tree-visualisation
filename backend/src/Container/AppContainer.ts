import { ItemsController } from '../Controllers/ItemsController';
import { ItemsRepository } from '../Repositories/ItemsRepository';
import { BaseContainer } from './BaseContainer';
import Logger from 'bunyan';

export class AppContainer extends BaseContainer {
    ItemsRepository(): ItemsRepository {
        return new ItemsRepository(this.databaseConnection().neo4j());
    }

    ItemsController(): ItemsController {
        return new ItemsController(this.ItemsRepository());
    }

    Logger(): Logger {
        return Logger.createLogger({
            name: 'application'
        });
    }
}
