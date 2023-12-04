import { hash } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/clients.entity"
import { TClientRequest, TClientResponse } from "../interfaces/client.interfaces";
import { clientSchemaResponse, clientsSchemaResponse } from "../schemas/clients.schemas";
import { AppError } from "../errors/AppError";


export class ClientService {
    async create(data: TClientRequest): Promise<TClientResponse> {
        const { email, name, password, telephone } = data
        const clientRepository = AppDataSource.getRepository(Client)
        const findClient = await clientRepository.findOne({
            where: {
                email
            }
        })
    
        if (findClient) {
            throw new AppError("Client already exists", 409)
        }
    
        const hashedPassword = await hash(password, 10)
    
        const client = clientRepository.create({
            name,
            email,
            password: hashedPassword,
            telephone
        })
    
        await clientRepository.save(client)
    
        return clientSchemaResponse.parse(client)
    }

    async list() {
        const clientRepository = AppDataSource.getRepository(Client)
        const clients = await clientRepository.find()
    
        return clientsSchemaResponse.parse(clients)
    }

    // async retrieve(){

    // }
}