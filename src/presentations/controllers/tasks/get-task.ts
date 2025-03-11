import { Request, Response } from "express"
import { z } from "zod"

import { IGetTaskUseCase } from "@/domain/use-cases/tasks"
import { NotExistError } from "@/application/errors/errors"

export class GetTaskController {
  constructor(private readonly getTaskUseCase: IGetTaskUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const getTaskParams = z.object({
        taskId: z.string().uuid()
      })

      const {
        taskId
      } = getTaskParams.parse(request.params)

      const task = await this.getTaskUseCase.execute({
        taskId,
      })

      return response.status(200).send({ task })
    } catch (error: unknown) {
      if (error instanceof NotExistError) {
        return response.status(404).send({ message: error.message })
      }

      throw error
    }
  }
}