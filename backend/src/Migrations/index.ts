import {MigrationsContainer} from './MigrationsContainer';

const container = new MigrationsContainer();

const itemsToMigrate: Migrator[] = [
    container.ItemsMigrator()
]

async function runMigrations() {
    for (const migrator of itemsToMigrate) {
        await migrator.migrate();
    }
}

runMigrations();