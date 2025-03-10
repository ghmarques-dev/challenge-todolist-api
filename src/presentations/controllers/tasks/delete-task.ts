import { Request, Response } from "express"
import { z } from "zod"

import { IDeleteTaskUseCase } from "@/domain/use-cases/tasks"
import { NotExistError } from "@/application/errors/errors"

export class DeleteTaskController {
  constructor(private readonly deleteTaskUseCase: IDeleteTaskUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const deleteTaskParams = z.object({
        taskId: z.string().uuid()
      })

      const {
        taskId
      } = deleteTaskParams.parse(request.body)

      await this.deleteTaskUseCase.execute({
        taskId,
      })

      return response.status(200).send()
    } catch (error: unknown) {
      if (error instanceof NotExistError) {
        return response.status(404).send({ message: error.message })
      }

      throw error
    }
  }
}