import { beforeEach, describe, expect, it, vitest } from "vitest"

import { AuthenticateUserUseCase } from "./authenticate-user"

import { HashRepository } from "@/application/protocols/crypto"
import { UsersRepository } from "@/application/protocols/database"

import { InvalidCredentialError, NotExistError } from "@/application/errors/errors"

import { InMemoryHashRepository } from "@/infra/crypto/in-memory"
import { InMemoryUsersRepository } from "@/infra/database/in-memory"

import { IAuthenticateUserUseCase } from "@/domain/use-cases/users"

let usersRepository: UsersRepository
let hashRepository: HashRepository
let sut: IAuthenticateUserUseCase


describe("authenticate user use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    hashRepository = new InMemoryHashRepository() 

    sut = new AuthenticateUserUseCase(usersRepository, hashRepository)

    usersRepository.create({
      userId: "userId-01",
      name: "name",
      email: "email",
      password: "password",
    })
  })

  it("should be able to authenticate with successful", async () => {
    const user = await sut.execute({
      email: "email",
      password: "password",
    })

    expect(user.userId).toBe("userId-01")
    expect(user.email).toBe("email")
    expect(user.name).toBe("name")
    expect(user.password).toBe("password")
    expect(user.createdAt).toBeDefined()
  })

  it("should be able to call findByEmail with correct values", async () => {
    const usersRepositorySpy = vitest.spyOn(usersRepository, 'findByEmail')

    await sut.execute({
      email: "email",
      password: "password",
    })

    expect(usersRepositorySpy).toHaveBeenCalledWith({
      email: "email",
    })
  })

  it("should be able to return an error user not exists", async () => {
    vitest.spyOn(usersRepository, "findByEmail").mockImplementationOnce(async () => null)

    await expect(() => sut.execute({
      email: "email",
      password: "password",
    })).rejects.toBeInstanceOf(NotExistError)
  })

  it("should be able to call compare hash repository with correct values", async () => {
    const hashRepositorySpy = vitest.spyOn(hashRepository, "compare")

    await sut.execute({
      email: "email",
      password: "password",
    })

    expect(hashRepositorySpy).toHaveBeenCalledWith({
      string: "password",
      hash: "password",
    })
  })

  it("should be able to return an error invalid credential", async () => {
    vitest.spyOn(hashRepository, 'compare').mockImplementationOnce(async () => false)

    await expect(() => sut.execute({
      email: "email",
      password: "password",
    })).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})  