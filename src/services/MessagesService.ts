import { getCustomRepository, Repository } from "typeorm"
import { MessagesRepository } from "../repositories/MessagesRepository"
import { Message } from "../entities/Message"

interface IMessageServices {
  admin_id?: string, //O ? define que o admin_id é um campo opcional
  text: string,
  user_id: string
}

class MessagesServices {
  //Atributo criado para que todos os métodos o chamem quando necessário, foi criado como private para estar disponível para a classe MessagesService
  private messagesRepository: Repository<Message>

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository)
  }
  async create({ admin_id, text, user_id }: IMessageServices) {

    const message = this.messagesRepository.create({
      admin_id,
      text,
      user_id
    })

    await this.messagesRepository.save(message)

    return message
  }

  async listByUser(user_id: string) {

    const list = await this.messagesRepository.find({
      where: { user_id },
      relations: ["user"], //ao usar o relations todos os outros dados referentes ao objeto serão filtrados pela querry
    })

    return list
  }
}


export { MessagesServices }