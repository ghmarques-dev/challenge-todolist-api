import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { InMemoryTasksRepository } from '@/infra/database/in-memory'
import { TasksRepository } from '@/application/protocols/database/tasks-repository'
import { IGetTasksUseCase } from '@/domain/use-cases/tasks'

import { GetTasksUseCase } from './get-tasks'

let tasksRepository: TasksRepository
let sut: IGetTasksUseCase

describe("get tasks use case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()

    sut = new GetTasksUseCase(tasksRepository)

    for (let i = 0; i < 40; i++) {
      tasksRepository.create({
        userId: "user-id",
        title: "title" + i,
        description: "description", 
        status: "Pending",
        deliveryDate: new Date(),
      })
    }
  })

  it("should be able to get all tasks with successful", async () => {
    const tasks = await sut.execute({
      userId: "user-id",
      page: 1,
      search: "title"
    })

    expect(tasks.tasks).toHaveLength(20)
    expect(tasks.meta.count_tasks).toBe(40)
  })

  it("should be able to page two with correct valus", async () => {
    const tasks = await sut.execute({
      userId: "user-id",
      page: 2,
      search: "title"
    })

    expect(tasks.tasks).toHaveLength(20)
    expect(tasks.meta.count_tasks).toBe(40)
  })

  it("should be able to return zero tasks", async () => {
    const tasks = await sut.execute({
      userId: "user-id",
      page: 1,
      search: "not-exist-task-with-title"
    })

    expect(tasks.tasks).toHaveLength(0)
    expect(tasks.meta.count_tasks).toBe(0)
  })

  it("should be able to call getAll with correct values", async () => {
    const tasksRepositorySpy = vitest.spyOn(tasksRepository, "getAll")

    await sut.execute({
      userId: "user-id",
      page: 1,
      search: "title"
    })

    expect(tasksRepositorySpy).toHaveBeenCalledWith({
      userId: "user-id",
      page: 1,
      search: "title",
    })
  })
})