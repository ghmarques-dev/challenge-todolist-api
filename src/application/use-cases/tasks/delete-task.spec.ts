import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { InMemoryTasksRepository } from '@/infra/database/in-memory'
import { TasksRepository } from '@/application/protocols/database/tasks-repository'
import { IDeleteTaskUseCase } from '@/domain/use-cases/tasks'

import { DeleteTaskUseCase } from './delete-task'
import { NotExistError } from '@/application/errors/errors'

let tasksRepository: TasksRepository
let sut: IDeleteTaskUseCase

describe("delete task use case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()

    sut = new DeleteTaskUseCase(tasksRepository)

    tasksRepository.create({
      userId: "user-id",
      title: "title",
      description: "description", 
      status: "Pending",
      deliveryDate: new Date()
    })
  })

  it("should be able to delete a task with successful", async () => {
    await sut.execute({
      taskId: "task-id",
    })
  })

  it("should be able to return error task not exists", async () => {
    vitest.spyOn(tasksRepository, "findById").mockImplementationOnce(async () => null)

    await expect(() => sut.execute({
      taskId: "task-id",
    })).rejects.toBeInstanceOf(NotExistError)
  })

  it("should be able to call delete with correct values", async () => {
    const tasksRepositorySpy = vitest.spyOn(tasksRepository, "delete")

    await sut.execute({
      taskId: "task-id",
    })

    expect(tasksRepositorySpy).toHaveBeenCalledWith({
      taskId: "task-id",
    })
  })
})