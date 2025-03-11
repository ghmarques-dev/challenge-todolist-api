import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { InMemoryTasksRepository } from '@/infra/database/in-memory'
import { TasksRepository } from '@/application/protocols/database/tasks-repository'
import { IGetTaskUseCase } from '@/domain/use-cases/tasks'

import { GetTaskUseCase } from './get-task'
import { NotExistError } from '@/application/errors/errors'

let tasksRepository: TasksRepository
let sut: IGetTaskUseCase

describe("get task use case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()

    sut = new GetTaskUseCase(tasksRepository)

    tasksRepository.create({
      userId: "user-id",
      title: "title",
      description: "description", 
      status: "Pending",
      deliveryDate: new Date()
    })
  })

  it("should be able to get a task with successful", async () => {
    const task = await sut.execute({
      taskId: "task-id",
    })

    expect(task.taskId).toBe("task-id")
    expect(task.userId).toBe("user-id")
    expect(task.title).toBe("title")
    expect(task.description).toBe("description")
    expect(task.status).toBe("Pending")
    expect(task.deliveryDate).toBeDefined()
    expect(task.createdAt).toBeDefined()
    expect(task.updatedAt).toBeDefined()
  })

  it("should be able to return error task not exists", async () => {
    vitest.spyOn(tasksRepository, "findById").mockImplementationOnce(async () => null)

    await expect(() => sut.execute({
      taskId: "task-id",
    })).rejects.toBeInstanceOf(NotExistError)
  })

  it("should be able to call findById with correct values", async () => {
    const tasksRepositorySpy = vitest.spyOn(tasksRepository, "findById")

    await sut.execute({
      taskId: "task-id",
    })

    expect(tasksRepositorySpy).toHaveBeenCalledWith({
      taskId: "task-id",
    })
  })
})