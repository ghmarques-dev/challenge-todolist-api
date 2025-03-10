import { Task, TaskStatus } from "@/domain/entities"

export type TasksRepository = {
  create(input: TasksRepository.Create.Input): TasksRepository.Create.Output
  delete(input: TasksRepository.Delete.Input): TasksRepository.Delete.Output
  update(input: TasksRepository.Update.Input): TasksRepository.Update.Output
  getAll(input: TasksRepository.GetAll.Input): TasksRepository.GetAll.Output
  findByTitle(input: TasksRepository.FindByTitle.Input): TasksRepository.FindByTitle.Output
}

export namespace TasksRepository {
  export namespace Create {
    export type Input = {
      userId: string
      title: string
      description?: string
      status: TaskStatus
      deliveryDate: Date
    }

    export type Output = Promise<Task>
  }

  export namespace Update {
    export type Input = {
      taskId: string
      userId: string
      title: string
      description?: string
      status: TaskStatus
      deliveryDate: Date
    }

    export type Output = Promise<Task>
  }

  export namespace Delete {
    export type Input = {
      taskId: string
    }

    export type Output = Promise<void>
  }

  export namespace GetAll {
    export type Input = {
      userId: string
    }

    export type Output = Promise<Task[]>
  }

  export namespace FindByTitle {
    export type Input = {
      userId: string
      title: string
    }

    export type Output = Promise<Task | null>
  }
}