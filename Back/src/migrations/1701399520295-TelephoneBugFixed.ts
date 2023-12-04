import { MigrationInterface, QueryRunner } from "typeorm";

export class TelephoneBugFixed1701399520295 implements MigrationInterface {
    name = 'TelephoneBugFixed1701399520295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "number" TO "telephone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "telephone" TO "number"`);
    }

}
