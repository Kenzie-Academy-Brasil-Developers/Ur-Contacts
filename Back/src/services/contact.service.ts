import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contacts.entity";
import { Client } from "../entities/clients.entity";
import { AppError } from "../errors/AppError";
import { TContact, TContactResponse, TContactRequest, TContactsResponse, TContactsUpdateRequest } from "../interfaces/contacts.interfaces";
import { contactSchema, contactsSchemaResponse } from "../schemas/contacts.schemas";


export class ContactsService {

    async create(data: TContactRequest, userId: string): Promise<TContactResponse> {
        const contactRepository = AppDataSource.getRepository(Contact)
        const clientRepository = AppDataSource.getRepository(Client)
        const client = await clientRepository.findOne({
            where: {
                id: userId
            }
        })

        if (!client) {
            throw new AppError("User not found", 404)
        }
        const contact: Contact = contactRepository.create({
            ...data,
            client
        })

        await contactRepository.save(contact)

        return contactSchema.parse(contact)
    }

    async list(userId: string): Promise<TContactsResponse> {
        const clientRepository = AppDataSource.getRepository(Client)
        const client = await clientRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                Contacts: true
            }
        })

        if (!client) {
            throw new AppError("User not found", 404)
        }
        console.log(client.Contacts)
        return contactsSchemaResponse.parse(client.Contacts)
    }


    async update(data: TContactsUpdateRequest, contactId: string): Promise<TContactResponse> {
        const contactRepository = AppDataSource.getRepository(Contact)
        const oldContact = await contactRepository.findOneBy({ id: contactId })

        if (!oldContact) {
            throw new AppError("Contact not found", 404)
        }


        const newContactData = contactRepository.create({
            ...oldContact,
            ...data
        })

        await contactRepository.save(newContactData)
      
        return contactSchema.parse(newContactData);
    }


    async remove(contactId: string): Promise<void> {
        const contactRepository = AppDataSource.getRepository(Contact)
        const contact = await contactRepository.findOneBy({ id: contactId })

        if (!contact) {
            throw new AppError("Contact not found", 404)
        }
        await contactRepository.remove(contact)
    }
}