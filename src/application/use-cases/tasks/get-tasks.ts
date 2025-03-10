import { TasksRepository } from "@/application/protocols/database/tasks-repository"

import { IGetTasksUseCase } from "@/domain/use-cases/tasks"

export class GetTasksUseCase implements IGetTasksUseCase {
  constructor (
    private taskssRepository: TasksRepository,
  ) {}

  async execute(input: IGetTasksUseCase.Input): IGetTasksUseCase.Output {
    const tasks = await this.taskssRepository.getAll({
      userId: input.userId,
    })

    return tasks
  }
} 
