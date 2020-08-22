import neo4j, { driver, Driver } from 'neo4j-driver';

export class Connection {
    neo4jConfig: Neo4JConfig;

    constructor(neo4jConfig: Neo4JConfig) {
        this.neo4jConfig = neo4jConfig;
    }

    neo4j(): Driver {
        // Create a driver instance, for the user `neo4j` with password `password`.
        // It should be enough to have a single driver per database per application.
        return neo4j.driver(
            this.neo4jConfig.protocol + '://' + this.neo4jConfig.host,
            neo4j.auth.basic(
                this.neo4jConfig.username,
                this.neo4jConfig.password
            )
        );
    }
}

interface Neo4JConfig {
    protocol: string;
    host: string;
    username: string;
    password: string;
}
