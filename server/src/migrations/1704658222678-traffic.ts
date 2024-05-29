import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTrafficTable1622375818855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS traffic (
                id SERIAL PRIMARY KEY,
                routes JSONB
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS traffic`);
    }

}
