import { Connection } from '../Database/Connection';
import keys from '../keys';
import bunyan from 'bunyan';

export abstract class BaseContainer {
    dbConnection: Connection;
    env: typeof keys;

    constructor(env: typeof keys) {
        this.env = env;
    }

    abstract logger(): bunyan;

    /**
     * Database connection singleton
     */
    databaseConnection(): Connection {
        if (this.dbConnection) {
            return this.dbConnection;
        }

        this.dbConnection = new Connection({
            protocol: this.env.NEO4J_PROTOCOL,
            host: this.env.NEO4J_HOST,
            username: this.env.NEO4J_USERNAME,
            password: this.env.NEO4J_PASSWORD,
            port: this.env.NEO4J_PORT
        });

        return this.dbConnection;
    }
}
