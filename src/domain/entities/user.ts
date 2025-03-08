import { Task } from "./task"

export type User = {
  userId: string
  name: string
  email: string
  password: string
  tasks: Task[]
  createdAt: Date
}