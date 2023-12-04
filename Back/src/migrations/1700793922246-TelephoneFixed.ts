import { MigrationInterface, QueryRunner } from "typeorm";

export class TelephoneFixed1700793922246 implements MigrationInterface {
    name = 'TelephoneFixed1700793922246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" RENAME COLUMN "number" TO "telephone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" RENAME COLUMN "telephone" TO "number"`);
    }

}
