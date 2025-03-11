import { CreateTaskUseCase } from "@/application/use-cases/tasks"
import { CreateTaskController } from "@/presentations/controllers/tasks"

import { PrismaTasksRepository } from "@/infra/database/prisma/repositories"

export function makeCreateTaskController() {
    const tasksRepository = new PrismaTasksRepository()

    const createTaskUseCase = new CreateTaskUseCase(tasksRepository)
    return new CreateTaskController(createTaskUseCase)
}