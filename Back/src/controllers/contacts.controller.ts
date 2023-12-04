import { Request, Response } from "express";
import { ContactsService } from "../services/contact.service";
import { TContactsUpdateRequest } from "../interfaces/contacts.interfaces";

export class ContactsController {
    constructor(private contactsService: ContactsService){}

    async create(req: Request, res: Response) {
        const clientId = res.locals.clientId

        const newContact = await this.contactsService.create(req.body, clientId)
        
        return res.status(201).json(newContact)
    }

    async list(req: Request, res: Response) {
        const clientId = res.locals.clientId

        const contacts = await this.contactsService.list(clientId)

        return res.json(contacts)
    }

    async update(req: Request, res: Response) {
        const updatedValues: TContactsUpdateRequest = req.body
        const contactId = req.params.id

        const updateTask = await this.contactsService.update(updatedValues, contactId)

        return res.json(updateTask)
    }

    async remove(req: Request, res: Response) {
        const contactId = req.params.id
        await this.contactsService.remove(contactId)

        res.status(204).send()
    }
}