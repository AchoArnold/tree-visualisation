import dotenv from 'dotenv';

dotenv.config();

export default {
    NEO4J_PROTOCOL: process.env.NEO4J_PROTOCOL,
    NEO4J_HOST: process.env.NEO4J_HOST,
    NEO4J_PORT: process.env.NEO4J_PORT,
    NEO4J_USERNAME: process.env.NEO4J_USERNAME,
    NEO4J_PASSWORD: process.env.NEO4J_PASSWORD,

    APP_PORT: process.env.APP_PORT
};
