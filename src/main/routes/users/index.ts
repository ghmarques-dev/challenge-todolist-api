import { Router } from "express"

import { 
  makeAuthenticateUserController,
  makeCreateUserController
} from "@/main/factories/users"

export const routesUsers = Router()

routesUsers.post(
  '/users', 
  async (request, response) => {
    await makeCreateUserController().handle(request, response)
  }
)

routesUsers.post(
  '/sessions', 
  async (request, response) => {
    await makeAuthenticateUserController().handle(request, response)
  }
)