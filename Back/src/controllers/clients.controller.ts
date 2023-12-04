import { Request, Response } from "express";
import { TClientRequest } from "../interfaces/client.interfaces";
import { ClientService } from "../services/clients.service";


class ClientsController {
    constructor(private clientService: ClientService) { }
    async create(req: Request, res: Response) {
        const { name, email, password, telephone }: TClientRequest = req.body
        const newClient = await this.clientService.create({ name, email, password, telephone })

        return res.status(201).json(newClient)
    }

    async list(_: Request, res: Response) {
        const clients = await this.clientService.list()
        return res.json(clients)
    }
}

export { ClientsController }