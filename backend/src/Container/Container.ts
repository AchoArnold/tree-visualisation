import {ItemsController} from "../Controllers/ItemsController";
import {ItemsRepository} from "../Repositories/ItemsRepository";
import connection from "../Database/Connection";

export class Container {
    ItemsRepository(): ItemsRepository {
        return new ItemsRepository(connection)
    }

    ItemsController(): ItemsController {
        return new ItemsController(this.ItemsRepository());
    }
}