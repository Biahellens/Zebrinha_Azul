import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateClimateTable1622375825142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS climate (
                id SERIAL PRIMARY KEY,
                "locationName" VARCHAR NOT NULL,
                region VARCHAR NOT NULL,
                country VARCHAR NOT NULL,
                forecast JSONB
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS climate`);
    }

}
