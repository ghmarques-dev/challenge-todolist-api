import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { HashRepository } from '@/application/protocols/crypto'
import { UsersRepository } from '@/application/protocols/database'

import { InMemoryUsersRepository } from '@/infra/database/in-memory'
import { InMemoryHashRepository } from '@/infra/crypto/in-memory'

import { ICreateUserUseCase } from '@/domain/use-cases/users'
import { CreateUserUseCase } from './create-user'
import { EmailAlreadyExistError } from '@/application/errors/errors'
import { User } from '@/domain/entities'

let usersRepository: UsersRepository
let hashRepository: HashRepository
let sut: ICreateUserUseCase

describe("create user use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    hashRepository = new InMemoryHashRepository() 

    sut = new CreateUserUseCase(usersRepository, hashRepository)
  })

  it("should be able to create a new user with successful", async () => {
    const user = await sut.execute({
      email: "email",
      name: "name",
      password: "password"
    })

    expect(user.userId).toBe("userId-01")
    expect(user.email).toBe("email")
    expect(user.name).toBe("name")
    expect(user.password).toBe("password")
    expect(user.createdAt).toBeDefined()
  })

  it("should be able to call findByEmail with the correct values", async () => {
    const usersRepositorySpy = vitest.spyOn(usersRepository, 'findByEmail')

    await sut.execute({
      email: "email",
      name: "name",
      password: "password", 
    })

    expect(usersRepositorySpy).toHaveBeenCalledWith({
      email: "email"
    })
  })

  it("should be able to return an error email already exists", async () => {
    const user: User = {
      userId: "userId",
      name: "name",
      email: "email",
      password: "password",
      tasks: [],
      createdAt: new Date()
    }

    vitest.spyOn(usersRepository, "findByEmail").mockImplementationOnce(async () => user)

    await expect(() => sut.execute({
      email: "email",
      name: "name",
      password: "password",
    })).rejects.toBeInstanceOf(EmailAlreadyExistError)
  })

  it("should be able to call create hash repository with correct values", async () => {
    const hashRepositorySpy = vitest.spyOn(hashRepository, "create")

    await sut.execute({
      email: "email",
      name: "name",
      password: "password",
    })

    expect(hashRepositorySpy).toHaveBeenCalledWith({
      string: "password",
      salt: 6,
    })
  })

  it("should be able to call create users repository with correct values", async () => {
    const usersRepositorySpy = vitest.spyOn(usersRepository, "create")

    await sut.execute({
      email: "email",
      name: "name",
      password: "password",
    })

    expect(usersRepositorySpy).toHaveBeenCalledWith({
      email: "email",
      name: "name",
      password: "password",
    })
  })
})