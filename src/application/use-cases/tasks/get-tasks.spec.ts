import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { InMemoryTasksRepository } from '@/infra/database/in-memory'
import { TasksRepository } from '@/application/protocols/database/tasks-repository'
import { IGetTasksUseCase } from '@/domain/use-cases/tasks'

import { GetTasksUseCase } from './get-tasks'
import { NotExistError } from '@/application/errors/errors'
import { Task } from '@/domain/entities'

let tasksRepository: TasksRepository
let sut: IGetTasksUseCase

describe("get task use case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()

    sut = new GetTasksUseCase(tasksRepository)

    for (let i = 0; i < 10; i++) {
      tasksRepository.create({
        userId: "user-id",
        title: "title-updated",
        description: "description", 
        status: "Pending",
        deliveryDate: new Date(),
      })
    }
  })

  it("should be able to get all tasks with successful", async () => {
    const tasks = await sut.execute({
      userId: "user-id"
    })

    expect(tasks).toHaveLength(10)
  })

  it("should be able to call getAll with correct values", async () => {
    const tasksRepositorySpy = vitest.spyOn(tasksRepository, "getAll")

    await sut.execute({
      userId: "user-id",
    })

    expect(tasksRepositorySpy).toHaveBeenCalledWith({
      userId: "user-id",
    })
  })
})