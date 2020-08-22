import { Item } from '../Entities/Item';
import { Driver } from 'neo4j-driver';

export class ItemsRepository {
    dbConnection: Driver;

    constructor(dbConnection: Driver) {
        this.dbConnection = dbConnection;
    }

    async load(): Promise<Item[]> {
        const session = this.dbConnection.session();
        try {
            const results = await session.run(`
                MATCH (nodes:Item)
                RETURN nodes
            `);

            return results.records.map((singleRecord) => {
                return singleRecord.get(0).properties;
            });
        } finally {
            await session.close();
        }
    }
}
