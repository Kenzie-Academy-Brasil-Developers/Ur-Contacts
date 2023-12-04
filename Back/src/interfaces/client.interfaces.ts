import { z } from "zod"
import { clientSchema, clientSchemaRequest, clientSchemaResponse, clientsSchemaResponse } from "../schemas/clients.schemas"

type TClientRequest = z.infer<typeof clientSchemaRequest>
type TClient = z.infer<typeof clientSchema>
type TClientResponse = z.infer<typeof clientSchemaResponse>
type TClientsResponse = z.infer<typeof clientsSchemaResponse>

export { TClient, TClientRequest, TClientResponse, TClientsResponse }