import { Task, TaskStatus } from "@/domain/entities"

export interface ICreateTaskUseCase {
  execute(input: ICreateTaskUseCase.Input): ICreateTaskUseCase.Output
}

export namespace ICreateTaskUseCase {
  export type Input = {
    userId: string
    title: string
    description?: string
    status: TaskStatus
    deliveryDate: Date
  }

  export type Output = Promise<Task>
}