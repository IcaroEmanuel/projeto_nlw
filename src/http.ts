import express from "express";
import { createServer } from "http"
import { Socket, Server } from "socket.io"
import path from "path"

const app = express();

//Configurando o diretório que pega o front-end
app.use(express.static(path.join(__dirname, "..", "public")))
app.set("views", path.join(__dirname, "..", "public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")
//Fim da configuração

const http = createServer(app) //Criando o protocolo htpp
const io = new Server(http) //Criando o protocolo websocket

import "./database"
import { routes } from "./routes";

io.on("connection", (socket: Socket) => {
  //console.log("Se conectou", socket.id)
})

//Acessando o front-end pelo browser
app.get("/pages/client", (request, response) => {
  return response.render("html/client.html")
})

app.use(express.json())

app.use(routes)

export { http, io }