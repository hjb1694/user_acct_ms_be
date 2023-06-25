import { AbstractMigration, Info, ClientPostgreSQL } from "https://deno.land/x/nessie@2.0.10/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
    /** Runs on migrate */
    async up(info: Info): Promise<void> {
        this.client.queryArray(`
        CREATE TYPE role AS ENUM('admin','staff','platinum_mod','gold_mod','bronze_mod','regular')
        `);
    }

    /** Runs on rollback */
    async down(info: Info): Promise<void> {
        this.client.queryArray(`
        DROP TYPE role;
        `);
    }
}
