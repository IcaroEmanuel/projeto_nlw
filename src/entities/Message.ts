import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"
import { v4 as uuid } from "uuid"

@Entity("messages")
class Message {
  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string

  //Código para definir o relacionamento de vários para um entre a coluna user_id e id das tabelas messages e users
  @JoinColumn({ name: "user_id" }) //Define um Join com a coluna user_id da tabela messages
  @ManyToOne(() => User) //Faz um relacionamento de muitos para um com a classe User
  user: User
  //Fim da configuração do relacionamento

  @Column()
  user_id: string

  @Column()
  text: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Message }