import { Request, Response } from "express"
import { z } from "zod"

import { IUpdateTaskUseCase } from "@/domain/use-cases/tasks"
import { AlreadyExistError, NotExistError } from "@/application/errors/errors"

export class UpdateTaskController {
  constructor(private readonly updateTaskUseCase: IUpdateTaskUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const updateTaskBody = z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(["Pending", "Progress", "Completed"]).optional(),
        deliveryDate: z.date().optional()
      })

      const updateTaskParams = z.object({
        taskId: z.string().uuid()
      })

      const {
        title,
        status,
        description,
        deliveryDate
      } = updateTaskBody.parse(request.body)
      const {
        taskId
      } = updateTaskParams.parse(request.params)

      const result = await this.updateTaskUseCase.execute({
        taskId,
        title,
        status,
        description,
        deliveryDate
      })

      return response.status(200).send({ task: result })
    } catch (error: unknown) {
      if (error instanceof NotExistError) {
        return response.status(404).send({ message: error.message })
      }

      if (error instanceof AlreadyExistError) {
        return response.status(400).send({ message: error.message })
      }

      throw error
    }
  }
}