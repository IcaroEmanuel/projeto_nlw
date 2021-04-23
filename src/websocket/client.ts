import { io } from "../http"
import { ConnectionsService } from "../services/ConnectionService"
import { UsersService } from "../services/UsersService"

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService()
  const usersServices = new UsersService()

  socket.on("client-first-connection", async (params) => {

    console.log(params)
    const socket_id = socket.id
    const { text, email } = params

    //Verifica se existe usuário através do email
    const userExists = usersServices.findByEmail(email)

    //Se não existir ele será criado e o user_id vai receber o id do objeto user
    if (!userExists) {
      const user = await usersServices.create(email)

      await connectionsService.create({
        socket_id,
        user_id: user.id
      })
    }

    //Se existir o user_id vai ser o id do objeto userExists
    else {
      await connectionsService.create({
        socket_id,
        user_id: (await userExists).id
      })
    }
  })
})