import { User } from "@/domain/entities"

import { UsersRepository } from "@/application/protocols/database"
import { prisma } from ".."

export class PrismaUsersRepository implements UsersRepository {
  async create(input: UsersRepository.Create.Input): UsersRepository.Create.Output {
    const user = await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        password: input.password,
      }
    })

    return this.mapToUser(user)
  }

  async findByEmail(input: UsersRepository.FindByEmail.Input): UsersRepository.FindByEmail.Output {
    const user = await prisma.user.findFirst({
      where: {
        email: input.email,
      },
    })

    return user ? this.mapToUser(user) : null
  }

  async findById(input: UsersRepository.FindById.Input): UsersRepository.FindById.Output {
    const user = await prisma.user.findFirst({
      where: {
        userId: input.userId,
      }
    })

    return user ? this.mapToUser(user) : null
  }

  private mapToUser(user: any): User {
    return {
      userId: user.userId.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      tasks: [],
      createdAt: user.createdAt,
    }
  }
}
