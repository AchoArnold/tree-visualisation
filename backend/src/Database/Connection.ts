import neo4j, {Driver} from 'neo4j-driver';

// Create a driver instance, for the user `neo4j` with password `password`.
// It should be enough to have a single driver per database per application.
const Connection: Driver = neo4j.driver(
    process.env.NEO4J_PROTOCOL + '://' + process.env.NEO4J_HOST,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
)
export default Connection;