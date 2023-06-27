import sql from '../../config/db_connect.ts';
import wrapper from '../util/migration_wrapper.ts';

const up = async function() {
    await sql`
    CREATE TYPE role AS ENUM('admin','staff','platinum_mod','gold_mod','silver_mod','regular')
    `
    sql.end();
}

const down = async function() {
    await sql`
    DROP TYPE role
    `
    sql.end();
}


await wrapper(up, down);
