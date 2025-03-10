import { AuthenticateUserUseCase } from "@/application/use-cases/users"
import { AuthenticateUserController } from "@/presentations/controllers/users"

import { PrismaUsersRepository } from "@/infra/database/prisma/repositories"
import { BcryptHashRepository } from "@/infra/crypto/bcrypt"

export function makeAuthenticateUserController() {
    const usersRepository = new PrismaUsersRepository()
    const hashRepository = new BcryptHashRepository()

    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository, hashRepository)
    return new AuthenticateUserController(authenticateUserUseCase)
}