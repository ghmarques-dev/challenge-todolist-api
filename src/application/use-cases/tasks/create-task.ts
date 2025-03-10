import { AlreadyExistError } from "@/application/errors/errors";
import { TasksRepository } from "@/application/protocols/database/tasks-repository";

import { ICreateTaskUseCase } from "@/domain/use-cases/tasks"

export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor (
    private tasksRepository: TasksRepository,
  ) {}

  async execute(input: ICreateTaskUseCase.Input): ICreateTaskUseCase.Output {
    const titleAlreadyExistsInUser = 
      await this.tasksRepository.findByTitle({ title: input.title, userId: input.userId })

    if (titleAlreadyExistsInUser) {
      throw new AlreadyExistError("Title")
    }

    const task = await this.tasksRepository.create({
      userId: input.userId,
      title: input.title,
      status: input.status,
      description: input.description,
      deliveryDate: input.deliveryDate
    })

    return task
  }
} 
