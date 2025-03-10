import { AlreadyExistError, NotExistError } from "@/application/errors/errors";
import { TasksRepository } from "@/application/protocols/database/tasks-repository";

import { IDeleteTaskUseCase } from "@/domain/use-cases/tasks"

export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor (
    private tasksRepository: TasksRepository,
  ) {}

  async execute(input: IDeleteTaskUseCase.Input): IDeleteTaskUseCase.Output {
    const task = await this.tasksRepository.findById({ taskId: input.taskId })

    if (!task) {
      throw new NotExistError("Task")
    }

    await this.tasksRepository.delete({
      taskId: task.taskId,
    })
  }
} 
