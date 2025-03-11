import { DeleteTaskUseCase } from "@/application/use-cases/tasks"
import { DeleteTaskController } from "@/presentations/controllers/tasks"

import { PrismaTasksRepository } from "@/infra/database/prisma/repositories"

export function makeDeleteTaskController() {
    const tasksRepository = new PrismaTasksRepository()

    const deleteTaskUseCase = new DeleteTaskUseCase(tasksRepository)
    return new DeleteTaskController(deleteTaskUseCase)
}