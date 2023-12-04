import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"
import { Client } from "./clients.entity"


@Entity("contacts")
export class Contact{
    @PrimaryGeneratedColumn("increment")
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    telephone: string
    
    @CreateDateColumn()
    registerAt: string

    @ManyToOne(() => Client)
    client: Client
}