import {z} from "zod"

const clientSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    telephone: z.string(),
    registerAt: z.string()
})

const clientSchemaRequest = clientSchema.omit({
    id: true,
    registerAt: true
})

const clientSchemaResponse = clientSchema.omit({
    password: true
})

const clientsSchemaResponse = z.array(clientSchemaResponse)

export{clientSchema, clientSchemaRequest, clientSchemaResponse, clientsSchemaResponse}