import { TasksRepository } from "@/application/protocols/database/tasks-repository"
import { prisma } from ".."
import { Task } from "@/domain/entities"

export class PrismaTasksRepository implements TasksRepository {
  async create(input: TasksRepository.Create.Input): TasksRepository.Create.Output {
    const task = await prisma.task.create({
      data: {
        userId: input.userId,
        title: input.title,
        description: input.description,
        status: input.status,
        deliveryDate: input.deliveryDate
      }
    })

    return this.mapToTask(task)
  }

  async update(input: TasksRepository.Update.Input): TasksRepository.Update.Output {
    const task = await prisma.task.update({
      where: {
        taskId: input.taskId
      },
      data: input,
    })

    return this.mapToTask(task)
  }

  async delete(input: TasksRepository.Delete.Input): TasksRepository.Delete.Output {
    await prisma.task.delete({
      where: {
        taskId: input.taskId
      }
    })
  }

  async getAll(input: TasksRepository.GetAll.Input): TasksRepository.GetAll.Output {
    const tasks = await prisma.task.findMany({
      where: {
        userId: input.userId,
        title: {
          contains: input.search, 
          mode: "insensitive",
        },
      },
      take: 20, 
      skip: (input.page - 1) * 20, 
      orderBy: {
        createdAt: "desc", 
      },
    })

    console.log(tasks, input)

    const tasksTyped = tasks.map(item => this.mapToTask(item))

    return tasksTyped
  }

  async findById(input: TasksRepository.FindById.Input): TasksRepository.FindById.Output {
    const task = await prisma.task.findFirst({
      where: {
        taskId: input.taskId
      }
    })

    return task ? this.mapToTask(task) : null
  }

  async findByTitle(input: TasksRepository.FindByTitle.Input): TasksRepository.FindByTitle.Output {
    const task = await prisma.task.findFirst({
      where: {
        title: input.title,
        userId: input
        .userId
      }
    })

    return task ? this.mapToTask(task) : null
  }

  async countAll(input: TasksRepository.CountAll.Input): TasksRepository.CountAll.Output {
    const count = await prisma.task.count({
      where: {
        userId: input.userId,
        title: {
          contains: input.search,
          mode: "insensitive",
        },
      },
    })

    return count
  }

  private mapToTask(task: any): Task {
    return {
      taskId: task.taskId.toString(),
      userId: task.userId.toString(),
      title: task.title,
      description: task.description ?? null,
      status: task.status,
      deliveryDate: task.deliveryDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    }
  }
}