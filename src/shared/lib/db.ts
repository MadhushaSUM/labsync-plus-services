import { Pool } from 'pg';
import { db_credentials } from './db_credentials';

const pool = new Pool({
    user: db_credentials.user,
    host: db_credentials.host,
    database: db_credentials.database,
    password: db_credentials.password,
    port: db_credentials.port,
    ssl: {
        rejectUnauthorized: false //TODO: For self-signed certificates (remove in production)
    },

    // Connection pool settings
    max: 10, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

export default pool;
