import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { InMemoryTasksRepository } from '@/infra/database/in-memory'
import { TasksRepository } from '@/application/protocols/database/tasks-repository'
import { ICreateTaskUseCase } from '@/domain/use-cases/tasks'

import { CreateTaskUseCase } from './create-task'
import { AlreadyExistError } from '@/application/errors/errors'
import { Task } from '@/domain/entities'

let tasksRepository: TasksRepository
let sut: ICreateTaskUseCase

describe("create task use case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()

    sut = new CreateTaskUseCase(tasksRepository)
  })

  it("should be able to create a new task with successful", async () => {
    const task = await sut.execute({
      userId: "user-id",
      title: "title",
      description: "description", 
      status: "Pending",
      deliveryDate: new Date()
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

  it("should be able to return one error already exist title", async () => {
    const task: Task = {
      taskId: "task-id",
      userId: "user-id",
      title: "title",
      description: "description", 
      status: "Pending",
      deliveryDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    vitest.spyOn(tasksRepository, "findByTitle").mockImplementationOnce(async () => task)

    await expect(() => sut.execute({
      userId: "user-id",
      title: "title",
      description: "description", 
      status: "Pending",
      deliveryDate: new Date()
    })).rejects.toBeInstanceOf(AlreadyExistError)
  })

  it("should be able to call findByTitle with correct values", async () => {
    const tasksRepositorySpy = vitest.spyOn(tasksRepository, "findByTitle")

    await sut.execute({
      userId: "user-id",
      title: "title",
      description: "description", 
      status: "Pending",
      deliveryDate: new Date()
    })

    expect(tasksRepositorySpy).toHaveBeenCalledWith({
      title: "title",
      userId: "user-id"
    })
  })

  it("should be able to call create with correct values", async () => {
    const tasksRepositorySpy = vitest.spyOn(tasksRepository, "create")

    await sut.execute({
      userId: "user-id",
      title: "title",
      description: "description", 
      status: "Pending",
      deliveryDate: new Date()
    })

    expect(tasksRepositorySpy).toHaveBeenCalledWith({
      userId: "user-id",
      title: "title",
      description: "description", 
      status: "Pending",
      deliveryDate: new Date()
    })
  })
})