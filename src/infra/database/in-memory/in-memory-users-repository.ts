import { UsersRepository } from "@/application/protocols/database"

import { User } from "@/domain/entities"

export class InMemoryUsersRepository implements UsersRepository {
  private database: User[] = []

  async create(input: UsersRepository.Create.Input): UsersRepository.Create.Output {
    const user: User = {
      userId: input.userId ?? "userId-01",
      name: input.name,
      email: input.email,
      password: input.password,
      tasks: [],
      createdAt: new Date()
    }

    this.database.push(user)

    return user
  }

  async findById(input: UsersRepository.FindById.Input): UsersRepository.FindById.Output {
    const user = this.database.find((item) => item.userId === input.userId)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(input: UsersRepository.FindByEmail.Input): UsersRepository.FindByEmail.Output {
    const user = this.database.find((item) => item.email === input.email)

    if (!user) {
      return null
    }

    return user
  }
}