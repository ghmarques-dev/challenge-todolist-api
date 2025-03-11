import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

import { env } from "@/infra/env"

export function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ message: "Unauthorized" })
  }

  const [, token] = authHeader.split(" ") 

  try {
    const decoded = verify(token, env.JWT_SECRET) as { sub: string };

    request.user = { id: decoded.sub }

    return next() 
  } catch (error) {
    return response.status(401).json({ message: "Unauthorized" })
  }
}