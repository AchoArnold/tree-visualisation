import { ItemsController } from '../Controllers/ItemsController';
import { ItemsRepository } from '../Repositories/ItemsRepository';
import { BaseContainer } from './BaseContainer';
import bunyan from 'bunyan';

export class AppContainer extends BaseContainer {
    itemsRepository(): ItemsRepository {
        return new ItemsRepository(this.databaseConnection().neo4j());
    }

    itemsController(): ItemsController {
        return new ItemsController(this.itemsRepository());
    }

    logger(): bunyan {
        return bunyan.createLogger({
            name: 'application'
        });
    }
}
