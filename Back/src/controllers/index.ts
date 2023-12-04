import { ClientService } from "../services/clients.service";
import { ClientsController } from "./clients.controller";
import { SessionController } from "./session.controller";
import { SessionService } from "../services/session.service";
import { ContactsService } from "../services/contact.service";
import { ContactsController } from "./contacts.controller";

const clientService = new ClientService
const clientsController = new ClientsController(clientService)

const sessionService = new SessionService()
const sessionController = new SessionController(sessionService)

const contactService = new ContactsService()
const contactController = new ContactsController(contactService)

export {clientsController, sessionController, contactController}