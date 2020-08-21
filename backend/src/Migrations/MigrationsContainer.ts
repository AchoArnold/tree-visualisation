import {ItemsMigrator} from "./ItemsMigrator";
import connection from "../Database/Connection";

export class MigrationsContainer {
    ItemsMigrator():ItemsMigrator {
        return new ItemsMigrator(connection)
    }
}