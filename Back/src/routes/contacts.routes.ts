import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { contactSchemaRequest, contactSchemaUpdate } from "../schemas/contacts.schemas";
import { contactController } from "../controllers";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { EnsureIsOwnerMiddleware } from "../middlewares/ensureIsOwner.middleware";

const contactsRoutes = Router()

contactsRoutes.use(ensureAuthMiddleware)

contactsRoutes.post("", ensureDataIsValidMiddleware(contactSchemaRequest), (req, res) => contactController.create(req, res))

contactsRoutes.get("", (req, res) => contactController.list(req, res))
contactsRoutes.patch("/:id", EnsureIsOwnerMiddleware, ensureDataIsValidMiddleware(contactSchemaUpdate), (req, res) => contactController.update(req, res))
contactsRoutes.delete("/:id", EnsureIsOwnerMiddleware, (req, res) => contactController.remove(req, res))

export { contactsRoutes }
