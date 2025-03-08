import { UsersRepository } from "@/application/protocols/database"
import { HashRepository } from "@/application/protocols/crypto"

import { InvalidCredentialError, NotExistError } from "@/application/errors/errors"

import { IAuthenticateUserUseCase } from "@/domain/use-cases/users"


export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor (
    private usersRepository: UsersRepository,
    private hashRepository: HashRepository
  ) { }

  async execute(input: IAuthenticateUserUseCase.Input): IAuthenticateUserUseCase.Output {
    const user = await this.usersRepository.findByEmail({ 
      email: input.email 
    })

    if (!user) {
      throw new NotExistError("User")
    }

    const comparePasswordHash = await this.hashRepository.compare({
      string: input.password, hash: user.password 
    })

    if (!comparePasswordHash) {
      throw new InvalidCredentialError()
    }

    return user
  }
}
