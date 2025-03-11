import { NotExistError } from "@/application/errors/errors"
import { TasksRepository } from "@/application/protocols/database/tasks-repository"

import { IGetTaskUseCase } from "@/domain/use-cases/tasks"

export class GetTaskUseCase implements IGetTaskUseCase {
  constructor (
    private tasksRepository: TasksRepository,
  ) {}

  async execute(input: IGetTaskUseCase.Input): IGetTaskUseCase.Output {
    const task = await this.tasksRepository.findById({ taskId: input.taskId })

    if (!task) {
      throw new NotExistError("Task")
    }

    return task
  }
} 
