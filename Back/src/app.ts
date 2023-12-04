import 'express-async-errors'
import express, { Application } from "express";
import { handleAppErrorMiddleware } from './middlewares/handleAppError.middleware';
import { clientsRoutes } from './routes/clients.routes';
import { contactsRoutes } from './routes/contacts.routes';
import { sessionRouter } from './routes/session.routes';

export const app: Application = express()
const cors = require('cors');



app.use(cors());

app.use(express.json())
app.use('/clients', clientsRoutes)
app.use('/contacts', contactsRoutes)
app.use('/login', sessionRouter)


app.use(handleAppErrorMiddleware)

export default app