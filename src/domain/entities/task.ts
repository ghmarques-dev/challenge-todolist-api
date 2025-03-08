export type TaskStatus = "Pending" | "Progress" | "Completed"

export type Task = {
  taskId: string
  title: string
  description?: string
  status: TaskStatus
  deliveryDate: Date
  createdAt: Date
  updatedAt: Date
}