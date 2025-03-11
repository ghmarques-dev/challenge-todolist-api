import { UpdateTaskUseCase } from "@/application/use-cases/tasks"
import { UpdateTaskController } from "@/presentations/controllers/tasks"

import { PrismaTasksRepository } from "@/infra/database/prisma/repositories"

export function makeUpdateTaskController() {
    const tasksRepository = new PrismaTasksRepository()

    const updateTaskUseCase = new UpdateTaskUseCase(tasksRepository)
    return new UpdateTaskController(updateTaskUseCase)
}