import {
    ClientPostgreSQL,
    NessieConfig,
} from "https://deno.land/x/nessie@2.0.10/mod.ts";
import { config as conf, Config } from './config/index.ts';


const client = new ClientPostgreSQL({
    database: conf.db[`${conf.env}`].db_name,
    hostname: conf.db[`${conf.env}`].host,
    port: conf.db[`${conf.env}`].port,
    user: conf.db[`${conf.env}`].user,
    password: conf.db[`${conf.env}`].password,
});


/** This is the final config object */
const config: NessieConfig = {
    client,
    migrationFolders: ["./db/migrations"],
    seedFolders: ["./db/seeds"],
};

export default config;
