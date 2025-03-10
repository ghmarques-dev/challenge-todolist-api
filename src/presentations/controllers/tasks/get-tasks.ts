import { Request, Response } from "express"

import { IGetTasksUseCase } from "@/domain/use-cases/tasks"

export class GetTasksController {
  constructor(private readonly getTasksUseCase: IGetTasksUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const result = await this.getTasksUseCase.execute({
        userId: request.user.id,
      })

      return response.status(200).send({ tasks: result })
    } catch (error: unknown) {
      throw error
    }
  }
}