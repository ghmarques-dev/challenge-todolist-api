import { Task, TaskStatus } from "@/domain/entities"

export interface IUpdateTaskUseCase {
  execute(input: IUpdateTaskUseCase.Input): IUpdateTaskUseCase.Output
}

export namespace IUpdateTaskUseCase {
  export type Input = {
    taskId: string
    title?: string
    description?: string
    status?: TaskStatus
    deliveryDate?: Date
  }

  export type Output = Promise<Task>
}