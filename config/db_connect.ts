import postgres from 'https://deno.land/x/postgresjs/mod.js';
import { config } from './index.ts';

const sql = postgres({
    host: config.db[`${config.env}`].host,
    port: config.db[`${config.env}`].port,
    database: config.db[`${config.env}`].db_name,
    username: config.db[`${config.env}`].user,
    password: config.db[`${config.env}`].password
})

export default sql