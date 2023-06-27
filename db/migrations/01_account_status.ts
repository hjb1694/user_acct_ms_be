import sql from '../../config/db_connect.ts';
import wrapper from '../util/migration_wrapper.ts';

const up = async function() {
    await sql`
    CREATE TYPE status AS ENUM('active','pending','banned','suspended','user_deactivated')
    `
    sql.end();
}

const down = async function() {
    await sql`
    DROP TYPE status
    `
    sql.end();
}


await wrapper(up, down);
