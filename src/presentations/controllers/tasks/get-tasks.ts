import { Request, Response } from "express"

import { z } from "zod"
import { IGetTasksUseCase } from "@/domain/use-cases/tasks"

export class GetTasksController {
  constructor(private readonly getTasksUseCase: IGetTasksUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const getTasksQuery = z.object({
        search: z.string().optional().default(""),
        page: z.coerce.number().default(1),
      })

      const {
        page,
        search
      } = getTasksQuery.parse(request.query)

      const result = await this.getTasksUseCase.execute({
        userId: request.user.id,
        page,
        search
      })

      return response.status(200).send({ tasks: result })
    } catch (error: unknown) {
      throw error
    }
  }
}