import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { InMemoryTasksRepository } from '@/infra/database/in-memory'
import { TasksRepository } from '@/application/protocols/database/tasks-repository'
import { IUpdateTaskUseCase } from '@/domain/use-cases/tasks'

import { UpdateTaskUseCase } from './update-task'
import { AlreadyExistError, NotExistError } from '@/application/errors/errors'
import { Task } from '@/domain/entities'

let tasksRepository: TasksRepository
let sut: IUpdateTaskUseCase

describe("update task use case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()

    sut = new UpdateTaskUseCase(tasksRepository)

    tasksRepository.create({
      userId: "user-id",
      title: "title",
      description: "description", 
      status: "Pending",
      deliveryDate: new Date()
    })
  })

  it("should be able to update a new task with successful", async () => {
    const task = await sut.execute({
      taskId: "task-id",
      title: "title-updated",
      description: "description-updated", 
      status: "Progress"
    })

    expect(task.taskId).toBe("task-id")
    expect(task.userId).toBe("user-id")
    expect(task.title).toBe("title-updated")
    expect(task.description).toBe("description-updated")
    expect(task.status).toBe("Progress")
    expect(task.deliveryDate).toBeDefined()
    expect(task.createdAt).toBeDefined()
    expect(task.updatedAt).toBeDefined()
  })

  it("should be able to return error task not exists", async () => {
    vitest.spyOn(tasksRepository, "findById").mockImplementationOnce(async () => null)

    await expect(() => sut.execute({
      taskId: "task-id",
      title: "title-updated",
      description: "description-updated", 
      status: "Progress"
    })).rejects.toBeInstanceOf(NotExistError)
  })

  it("should be able to return one error already exist title", async () => {
    const task: Task = {
      taskId: "task-01",
      userId: "user-id",
      title: "title-updated",
      description: "description", 
      status: "Pending",
      deliveryDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    vitest.spyOn(tasksRepository, "findByTitle").mockImplementationOnce(async () => task)

    await expect(() => sut.execute({
      taskId: "task-id",
      title: "title",
      description: "description", 
      status: "Progress"
    })).rejects.toBeInstanceOf(AlreadyExistError)
  })

  it("should be able to call findByTitle with correct values", async () => {
    const tasksRepositorySpy = vitest.spyOn(tasksRepository, "findByTitle")

    await sut.execute({
      taskId: "task-id",
      title: "title",
      description: "description", 
      status: "Progress"
    })

    expect(tasksRepositorySpy).toHaveBeenCalledWith({
      title: "title",
      userId: "user-id"
    })
  })

  it("should be able to call update with correct values", async () => {
    const tasksRepositorySpy = vitest.spyOn(tasksRepository, "update")

    await sut.execute({
      taskId: "task-id",
      title: "title",
      description: "description", 
      status: "Progress"
    })

    expect(tasksRepositorySpy).toHaveBeenCalledWith({
      userId: "user-id",
      taskId: "task-id",
      title: "title",
      description: "description", 
      status: "Progress",
      deliveryDate: new Date()
    })
  })
})