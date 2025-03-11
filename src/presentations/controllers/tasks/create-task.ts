import { Request, Response } from "express"
import { z } from "zod"

import { ICreateTaskUseCase } from "@/domain/use-cases/tasks"
import { AlreadyExistError } from "@/application/errors/errors"

export class CreateTaskController {
  constructor(private readonly createTaskUseCase: ICreateTaskUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const createTaskBody = z.object({
        title: z.string(),
        description: z.string().optional(),
        status: z.enum(["Pending", "Progress", "Completed"]),
        deliveryDate: z
          .string()
          .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
          })
          .transform((val) => new Date(val))
      })

      const {
        title,
        status,
        description,
        deliveryDate
      } = createTaskBody.parse(request.body)

      const result = await this.createTaskUseCase.execute({
        userId: request.user.id,
        title,
        status,
        description,
        deliveryDate
      })

      return response.status(201).send({ task: result })
    } catch (error: any) {
      if (error instanceof AlreadyExistError) {
        return response.status(400).send({ message: error.message })
      }

      throw error
    }
  }
}