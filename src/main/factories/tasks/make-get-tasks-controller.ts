import { GetTasksUseCase } from "@/application/use-cases/tasks"
import { GetTasksController } from "@/presentations/controllers/tasks"

import { PrismaTasksRepository } from "@/infra/database/prisma/repositories"

export function makeGetTasksController() {
    const tasksRepository = new PrismaTasksRepository()

    const getTaskUseCase = new GetTasksUseCase(tasksRepository)
    return new GetTasksController(getTaskUseCase)
}