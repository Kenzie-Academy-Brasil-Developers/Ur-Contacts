import { Router } from "express";
import { clientsController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { clientSchemaRequest } from "../schemas/clients.schemas";
import { EnsureIsOwnerMiddleware } from "../middlewares/ensureIsOwner.middleware";

const clientsRoutes = Router()

clientsRoutes.post("", ensureDataIsValidMiddleware(clientSchemaRequest), (req, res) => clientsController.create(req, res))

clientsRoutes.get("", (req, res) => {clientsController.list(req, res)})

clientsRoutes.patch("/:id", EnsureIsOwnerMiddleware, ensureDataIsValidMiddleware(clientSchemaRequest), (req, res) => clientsController.update(req, res))

clientsRoutes.delete("/:id", EnsureIsOwnerMiddleware, (req, res) => {clientsController.remove(req, res)})



export {clientsRoutes}