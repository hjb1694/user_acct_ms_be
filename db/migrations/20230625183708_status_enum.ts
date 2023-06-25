import { AbstractMigration, Info, ClientPostgreSQL } from "https://deno.land/x/nessie@2.0.10/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
    /** Runs on migrate */
    async up(info: Info): Promise<void> {
        this.client.queryArray(`
        CREATE TYPE account_status AS ENUM('active','pending','suspended','closed_by_user')
        `);
    }

    /** Runs on rollback */
    async down(info: Info): Promise<void> {
        this.client.queryArray(`
        DROP TYPE account_status
        `);
    }
}
