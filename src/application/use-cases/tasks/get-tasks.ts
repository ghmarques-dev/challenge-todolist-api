import { TasksRepository } from "@/application/protocols/database"

import { IGetTasksUseCase } from "@/domain/use-cases/tasks"

export class GetTasksUseCase implements IGetTasksUseCase {
  constructor (
    private tasksRepository: TasksRepository,
  ) {}

  async execute(input: IGetTasksUseCase.Input): IGetTasksUseCase.Output {
    const tasks = await this.tasksRepository.getAll({
      userId: input.userId,
      page: input.page,
      search: input.search
    })

    const countAllTasks = await this.tasksRepository.countAll({
      userId: input.userId,
      search: input.search
    })

    return {
      tasks,
      meta: {
        count_tasks: countAllTasks
      }
    }
  }
} 
