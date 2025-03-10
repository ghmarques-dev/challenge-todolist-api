import { UseCaseError } from "../use-case-error"

export class AlreadyExistError extends Error implements UseCaseError {
  constructor (message: string) {
    super(message + " already exists")
  }
}