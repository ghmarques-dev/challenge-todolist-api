import { Task } from "@/domain/entities"

export interface IGetTasksUseCase {
  execute(input: IGetTasksUseCase.Input): IGetTasksUseCase.Output
}

export namespace IGetTasksUseCase {
  export type Input = {
    userId: string
    search: string
    page: number
  }

  export type Output = Promise<{
    tasks: Task[],
    meta: {
      count_tasks: number
    }
  }>
}