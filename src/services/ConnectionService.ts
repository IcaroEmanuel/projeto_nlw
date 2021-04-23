import { getCustomRepository, Repository } from "typeorm"
import { ConnectionsRepository } from "../repositories/ConnectionsRepository"
import { Connection } from "../entities/Connection"

interface IConnectionRepository {
  admin_id?: string,
  user_id: string,
  socket_id: string
  id?: string
}

class ConnectionsService {
  private connectionService: Repository<Connection>

  constructor() {
    this.connectionService = getCustomRepository(ConnectionsRepository)
  }

  async create({ admin_id, user_id, socket_id, id }: IConnectionRepository) {
    const connection = this.connectionService.create({
      admin_id,
      user_id,
      socket_id,
      id
    })

    await this.connectionService.save(connection)

    return connection
  }
}

export { ConnectionsService }