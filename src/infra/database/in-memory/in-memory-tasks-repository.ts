import { TasksRepository } from "@/application/protocols/database/tasks-repository"

import { Task } from "@/domain/entities"

export class InMemoryTasksRepository implements TasksRepository {
  private database: Task[] = []

  async create(input: TasksRepository.Create.Input): TasksRepository.Create.Output {
    const task: Task = {
      userId: input.userId,
      taskId: 'task-id',
      title: input.title,
      status: input.status,
      description: input.description,
      deliveryDate: input.deliveryDate,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.database.push(task)

    return task
  }

  async update(input: TasksRepository.Update.Input): TasksRepository.Update.Output {
    const taskIndex = this.database.findIndex((task) => task.taskId === input.taskId)
    
    const updatedTask: Task = {
      ...this.database[taskIndex],
      ...input,
    }

    this.database[taskIndex] = updatedTask
    return updatedTask
  }

  async delete(input: TasksRepository.Delete.Input): TasksRepository.Delete.Output {
    this.database = 
      this.database.filter((task) => task.taskId !== input.taskId)
  }

  async getAll(input: TasksRepository.GetAll.Input): TasksRepository.GetAll.Output {
    const tasks = this.database.filter((task) => task.userId === input.userId)

    return tasks
  }

  async findByTitle(input: TasksRepository.FindByTitle.Input): TasksRepository.FindByTitle.Output {
    const task =  
      this.database.find((task) => task.userId === input.userId && task.title === input.title)

    if(!task) {
      return null
    }

    return task
  }

  async findById(input: TasksRepository.FindById.Input): TasksRepository.FindById.Output {
    const task =  
      this.database.find((task) => task.taskId === input.taskId)

    if(!task) {
      return null
    }

    return task
  }
}