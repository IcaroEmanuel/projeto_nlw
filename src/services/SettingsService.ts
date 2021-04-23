import { getCustomRepository, Repository } from "typeorm"
import { Setting } from "../entities/Setting"
import { SettingsRepository } from "../repositories/SettingsRepository"

interface ISettingsCreate {
  chat: boolean
  username: string
}

class SettingsService {
  private settingsRepository: Repository<Setting>

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository)
  }

  async create({ chat, username }: ISettingsCreate) {

    //Verificar se o usuário existe
    const isUserAlready = await this.settingsRepository.findOne({
      username
    })

    if (isUserAlready) {
      throw new Error("User already exists")
    }
    //Fim da verificação

    const settings = this.settingsRepository.create({
      chat,
      username,
    })

    await this.settingsRepository.save(settings)

    return settings
  }
}

export { SettingsService }