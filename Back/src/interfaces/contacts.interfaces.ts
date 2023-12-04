import { z } from "zod"
import { contactSchema, contactSchemaRequest, contactSchemaUpdate, contactsSchemaResponse } from "../schemas/contacts.schemas"
import { DeepPartial } from "typeorm"


type TContactRequest = z.infer<typeof contactSchemaRequest>
type TContact = z.infer<typeof contactSchema>
type TContactResponse = z.infer<typeof contactSchema>
type TContactsResponse = z.infer<typeof contactsSchemaResponse>
type TContactsUpdateRequest = DeepPartial<TContactRequest>


export { TContactRequest, TContact, TContactResponse, TContactsUpdateRequest, TContactsResponse }