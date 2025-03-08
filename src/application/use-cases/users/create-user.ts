import { ICreateUserUseCase } from "@/domain/use-cases/users"
import { UsersRepository } from "@/application/protocols/database"

import { EmailAlreadyExistError } from "@/application/errors/errors"
import { HashRepository } from "@/application/protocols/crypto"

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor (
    private usersRepository: UsersRepository,
    private hashRepository: HashRepository
  ) {}

  async execute(input: ICreateUserUseCase.Input): ICreateUserUseCase.Output {
    const userAlreadyExists = await this.usersRepository.findByEmail({ 
      email: input.email 
    })

    if (userAlreadyExists) {
      throw new EmailAlreadyExistError()
    }

    const passwordHash = await this.hashRepository.create({ 
      string: input.password, salt: 6 
    })

    const user = await this.usersRepository.create({
      email: input.email,
      name: input.name,
      password: passwordHash,
    })

    return user
  }
} 
