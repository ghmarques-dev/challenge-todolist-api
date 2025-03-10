import { CreateUserUseCase } from "@/application/use-cases/users"
import { CreateUserController } from "@/presentations/controllers/users"

import { PrismaUsersRepository } from "@/infra/database/prisma/repositories"
import { BcryptHashRepository } from "@/infra/crypto/bcrypt"

export function makeCreateUserController() {
    const usersRepository = new PrismaUsersRepository()
    const hashRepository = new BcryptHashRepository()

    const createUserUseCase = new CreateUserUseCase(usersRepository, hashRepository)
    return new CreateUserController(createUserUseCase)
}