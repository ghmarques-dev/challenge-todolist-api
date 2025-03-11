import { GetTaskUseCase } from "@/application/use-cases/tasks"
import { GetTaskController } from "@/presentations/controllers/tasks"

import { PrismaTasksRepository } from "@/infra/database/prisma/repositories"

export function makeGetTaskController() {
    const tasksRepository = new PrismaTasksRepository()

    const getTaskUseCase = new GetTaskUseCase(tasksRepository)
    return new GetTaskController(getTaskUseCase)
}