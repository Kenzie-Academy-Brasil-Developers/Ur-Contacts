import { Router } from "express";
import { clientsController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { clientSchemaRequest } from "../schemas/clients.schemas";

const clientsRoutes = Router()

clientsRoutes.post("", ensureDataIsValidMiddleware(clientSchemaRequest), (req, res) => clientsController.create(req, res))

clientsRoutes.get("", (req, res) => {clientsController.list(req, res)})

export {clientsRoutes}