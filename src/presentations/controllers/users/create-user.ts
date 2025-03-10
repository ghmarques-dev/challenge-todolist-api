import { Request, Response } from "express"
import { z } from "zod"

import { ICreateUserUseCase } from "@/domain/use-cases/users"
import { AlreadyExistError } from "@/application/errors/errors"
import { sign } from "jsonwebtoken"
import { env } from "@/infra/env"

export class CreateUserController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const createUserBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })

      const {
        email,
        name,
        password
      } = createUserBody.parse(request.body)

      const result = await this.createUserUseCase.execute({
        email,
        name,
        password
      })

      const token = sign({ sub: result.userId }, env.JWT_SECRET)

      return response.status(201).send({ token })
    } catch (error: any) {
      if (error instanceof AlreadyExistError) {
        return response.status(400).send({ message: error.message })
      }

      throw error
    }
  }
}