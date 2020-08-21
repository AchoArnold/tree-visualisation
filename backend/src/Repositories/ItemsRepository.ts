import connection from "../Database/Connection";
import {Item} from '../Entities/Item'

export class ItemsRepository {
    dbConnection: typeof connection;

    constructor(dbConnection: typeof connection) {
        this.dbConnection = dbConnection;
    }

    async load(): Promise<Item[]> {
        return new Promise<Item[]>((resolve, reject) => {
            resolve([])
        })
    }
}