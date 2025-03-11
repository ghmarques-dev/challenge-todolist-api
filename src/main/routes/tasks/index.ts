import { Router } from "express"

import { ensureAuthenticated } from "@/presentations/middlewares"
import { 
  makeCreateTaskController, 
  makeDeleteTaskController, 
  makeGetTasksController, 
  makeUpdateTaskController 
} from "@/main/factories/tasks"
import { makeGetTaskController } from "@/main/factories/tasks/make-get-task-controller"

export const routesTasks = Router()

routesTasks.use(ensureAuthenticated as any)

routesTasks.get(
  '/tasks', 
  async (request, response) => {
    await makeGetTasksController().handle(request, response)
  }
)

routesTasks.get(
  '/tasks/:taskId', 
  async (request, response) => {
    await makeGetTaskController().handle(request, response)
  }
)

routesTasks.post(
  '/tasks', 
  async (request, response) => {
    await makeCreateTaskController().handle(request, response)
  }
)

routesTasks.put(
  '/tasks/:taskId', 
  async (request, response) => {
    await makeUpdateTaskController().handle(request, response)
  }
)

routesTasks.delete(
  '/tasks/:taskId', 
  async (request, response) => {
    await makeDeleteTaskController().handle(request, response)
  }
)