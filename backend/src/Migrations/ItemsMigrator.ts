import itemsData from './items.json';
import {Item} from "../Entities/Item";
import connection from "../Database/Connection";

export class ItemsMigrator implements Migrator {
    dbConnection: typeof connection

    constructor(dbConnection: typeof connection) {
        this.dbConnection = dbConnection
    }

    async migrate():Promise<void>{
        const items = itemsData.data.map((item) => {
            return {
                name: item.name,
                description: item.description,
                parent: item.parentId ?? item.parent
            } as Item
        })

        
    };
}