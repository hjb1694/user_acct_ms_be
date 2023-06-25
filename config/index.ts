import { load } from "https://deno.land/std@0.192.0/dotenv/mod.ts";

enum AppEnv {
    development = 'development',
    production = 'production'
}

interface DBCredentials {
    db_name: string;
    host: string;
    user: string;
    password: string;
    port: number;
}

interface DBConfig {
    [key:string]: DBCredentials;
}

export interface Config {
    api_key: string;
    env: string | AppEnv;
    port: number;
    db: DBConfig;
}

const env = await load();

export const config: Config = {
    api_key: env['API_KEY'],
    env: env['APP_ENV'] || 'development',
    port: +env['PORT'] || 3000, 
    db: {
        development: {
            db_name: env['DEV_DB_NAME'] || 'auth_dev',
            host: env['DEV_DB_HOST'] || '127.0.0.1',
            user: env['DEV_DB_USER'] || 'postgres',
            password: env['DEV_DB_PASSWORD'] || 'password',
            port: +env['DEV_DB_PORT'] || 5432
        }, 
        production: {
            db_name: env['PROD_DB_NAME'] || 'auth_prod',
            host: env['PROD_DB_HOST'], 
            user: env['PROD_DB_USER'],
            password: env['PROD_DB_PASSWORD'],
            port: +env['PROD_DB_PORT'] || 5432
        }
    }
}