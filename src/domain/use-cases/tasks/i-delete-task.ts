export interface IDeleteTaskUseCase {
  execute(input: IDeleteTaskUseCase.Input): IDeleteTaskUseCase.Output
}

export namespace IDeleteTaskUseCase {
  export type Input = {
    taskId: string
  }

  export type Output = Promise<void>
}