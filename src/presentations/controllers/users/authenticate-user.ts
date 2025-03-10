import { Request, Response } from "express"
import { z } from "zod"

import { sign } from "jsonwebtoken"
import { env } from "@/infra/env"

import { IAuthenticateUserUseCase } from "@/domain/use-cases/users"
import { InvalidCredentialError, NotExistError } from "@/application/errors/errors"

export class AuthenticateUserController {
  constructor(private readonly authenticateUserUseCase: IAuthenticateUserUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const authenticateUserBody = z.object({
        email: z.string().email(),
        password: z.string(),
      })

      const {
        email,
        password
      } = authenticateUserBody.parse(request.body)

      const result = await this.authenticateUserUseCase.execute({
        email,
        password
      })

      const token = sign({ sub: result.userId }, env.JWT_SECRET)

      return response.status(200).send({ token })
    } catch (error: unknown) {
      if (error instanceof NotExistError) {
        return response.status(404).send({ message: error.message })
      }

      if (error instanceof InvalidCredentialError) {
        return response.status(400).send({ message: error.message })
      }

      throw error
    }
  }
}