import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany, CreateDateColumn } from "typeorm"
import { getRounds, hashSync } from "bcryptjs";
import { Contact } from "./contacts.entity";

@Entity('clients')
class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string
    
    @Column({unique: true})
    email: string
    
    @Column()
    password: string
    
    @Column({length: 11})
    telephone: string
    
    @CreateDateColumn({ type: "date"})
    registerAt: string

    @OneToMany(() => Contact, contact => contact.client, { cascade: true, onDelete: 'CASCADE' })
    Contacts: Contact[]

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
      const hasRounds: number = getRounds(this.password);
      if (!hasRounds) {
        this.password = hashSync(this.password, 10);
      }
    }

}


export { Client }