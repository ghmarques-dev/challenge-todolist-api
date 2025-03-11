import { Task } from "@/domain/entities"

export interface IGetTaskUseCase {
  execute(input: IGetTaskUseCase.Input): IGetTaskUseCase.Output
}

export namespace IGetTaskUseCase {
  export type Input = {
    taskId: string
  }

  export type Output = Promise<Task>
}