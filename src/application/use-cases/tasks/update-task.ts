import { AlreadyExistError, NotExistError } from "@/application/errors/errors"
import { TasksRepository } from "@/application/protocols/database/tasks-repository"

import { IUpdateTaskUseCase } from "@/domain/use-cases/tasks"

export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor (
    private tasksRepository: TasksRepository,
  ) {}

  async execute(input: IUpdateTaskUseCase.Input): IUpdateTaskUseCase.Output {
    const taskById = await this.tasksRepository.findById({ taskId: input.taskId })

    if (!taskById) {
      throw new NotExistError("Task")
    }

    const taskAssign = Object.assign(taskById, input)

    const titleAlreadyExistsInUser = 
      await this.tasksRepository.findByTitle({ title: taskAssign.title, userId: taskAssign.userId })

    if (
      titleAlreadyExistsInUser && titleAlreadyExistsInUser.taskId !== input.taskId
    ) {
      throw new AlreadyExistError("Title")
    }

    const task = await this.tasksRepository.update({
      taskId: taskAssign.taskId,
      userId: taskAssign.userId,
      title: taskAssign.title,
      status: taskAssign.status,
      description: taskAssign.description,
      deliveryDate: taskAssign.deliveryDate
    })

    return task
  }
} 
