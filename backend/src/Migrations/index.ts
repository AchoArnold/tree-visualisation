import { MigrationsContainer } from '../Container/MigrationsContainer';
import keys from '../keys';
import { Migrator } from './Migrator';

const container = new MigrationsContainer(keys);
const logger = container.logger();

const itemsToMigrate: Migrator[] = [
    container.truncateMigrator(),
    container.itemsMigrator()
];

async function runMigrations() {
    for (const migrator of itemsToMigrate) {
        logger.info('Migrating:', migrator.constructor.name);
        await migrator.migrate();
    }
}

logger.info('Running migration');
runMigrations().then(async () => {
    logger.info('Migration finished');
    await container.databaseConnection().neo4j().close();
    process.exit(0);
});
