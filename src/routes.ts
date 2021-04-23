import { Router } from "express"
import { SettingsController } from "./controller/SettingsController"
import { UsersController } from "./controller/UsersController"
import { MessagesController } from "./controller/MessagesController"


const routes = Router()

const settingsController = new SettingsController()

const userController = new UsersController()

const messageController = new MessagesController()

/**
 * Tipos de parâmetros para trabalhar com requisições
 * Rout Params => parâmetros de rotas
 * http://localhost:3333/settings/1 onde 1 é o id por exemplo
 * Query Params => filtros e buscas
 * http://localhost:3333/settings/1?search=algumapesquisa
 * Body Params => parâmetros do corpo da requisição
 *  São passados em forma de json quando precisamos inserir objetos dentro da requisição
 * {} 
 */
routes.post("/users", userController.create)
routes.post("/settings", settingsController.create)

//Rotas de messages
routes.post("/messages", messageController.create)
routes.get("/messages/:id", messageController.showMessagesByUsers)

export { routes }