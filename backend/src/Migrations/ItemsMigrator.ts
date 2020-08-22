import itemsData from './items.json';
import { Item } from '../Entities/Item';
import { Driver } from 'neo4j-driver';
import { Migrator } from './Migrator';
import Logger from 'bunyan';

export class ItemsMigrator implements Migrator {
    dbConnection: Driver;
    logger: Logger;

    constructor(dbConnection: Driver, logger: Logger) {
        this.dbConnection = dbConnection;
        this.logger = logger;
    }

    async migrate(): Promise<void> {
        const items = itemsData.data.map((item) => {
            return {
                name: item.name,
                description: item.description,
                parent: item.parentId ?? item.parent
            } as Item;
        });

        const session = this.dbConnection.session();

        try {
            for (const item of items) {
                await session.run(
                    'CREATE (node:Item{ name: $name, description: $description, parent: $parent})',
                    item
                );

                if (item.parent) {
                    await session.run(
                        `
                            MATCH (parent:Item),(child:Item)
                            WHERE parent.name = $parent AND child.name = $name
                            CREATE (parent)-[r:CHILD]->(child)
                        `,
                        item
                    );
                }
            }
        } catch (e) {
            this.logger.error(e);
        } finally {
            await session.close();
        }
    }
}
