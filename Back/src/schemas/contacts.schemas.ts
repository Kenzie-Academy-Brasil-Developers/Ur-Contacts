import { z } from "zod";


const contactSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    telephone: z.string(),
    registerAt: z.date()
})

const contactSchemaRequest = contactSchema.omit({
    id: true,
    registerAt: true
})

const contactsSchemaResponse = z.array(contactSchema)

const contactSchemaUpdate = contactSchema.omit({
    id: true
}).partial()


export { contactSchema, contactSchemaRequest, contactSchemaUpdate, contactsSchemaResponse }