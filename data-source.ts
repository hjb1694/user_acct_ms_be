import { DataSource } from 'typeorm';
import { config } from './config/index.ts';

export const AppDataSource = new DataSource({
    type: config.db[`${config.env}`].client,
    host: config.db[`${config.env}`].host,
    port: config.db[`${config.env}`].port,
    username: config.db[`${config.env}`].user, 
    password: config.db[`${config.env}`].password, 
    database: config.db[`${config.env}`].db_name, 
    entities: ['./db/entities/*.ts']
})