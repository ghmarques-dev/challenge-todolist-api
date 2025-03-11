import { Task, TaskStatus } from "@/domain/entities"

export type TasksRepository = {
  create(input: TasksRepository.Create.Input): TasksRepository.Create.Output
  delete(input: TasksRepository.Delete.Input): TasksRepository.Delete.Output
  update(input: TasksRepository.Update.Input): TasksRepository.Update.Output
  getAll(input: TasksRepository.GetAll.Input): TasksRepository.GetAll.Output
  countAll(input: TasksRepository.CountAll.Input): TasksRepository.CountAll.Output
  findByTitle(input: TasksRepository.FindByTitle.Input): TasksRepository.FindByTitle.Output
  findById(input: TasksRepository.FindById.Input): TasksRepository.FindById.Output
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
      search: string
      page: number
    }

    export type Output = Promise<Task[]>
  }

  export namespace CountAll {
    export type Input = {
      userId: string
      search: string
    }

    export type Output = Promise<number>
  }

  export namespace FindByTitle {
    export type Input = {
      userId: string
      title: string
    }

    export type Output = Promise<Task | null>
  }

  export namespace FindById {
    export type Input = {
      taskId: string
    }

    export type Output = Promise<Task | null>
  }
}