import { Task } from "@/domain/entities"

export interface IGetTasksUseCase {
  execute(input: IGetTasksUseCase.Input): IGetTasksUseCase.Output
}

export namespace IGetTasksUseCase {
  export type Input = {
    taskId: string
    userId: string
  }

  export type Output = Promise<Task[]>
}