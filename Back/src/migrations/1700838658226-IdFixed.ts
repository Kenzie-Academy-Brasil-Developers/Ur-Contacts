import { MigrationInterface, QueryRunner } from "typeorm";

export class IdFixed1700838658226 implements MigrationInterface {
    name = 'IdFixed1700838658226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_8039454fab552403d5579cf7423"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "registerAt"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "registerAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_8039454fab552403d5579cf7423" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_8039454fab552403d5579cf7423"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "clientId" integer`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "registerAt"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "registerAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_8039454fab552403d5579cf7423" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
