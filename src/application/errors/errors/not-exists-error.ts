import { UseCaseError } from "../use-case-error"

export class NotExistError extends Error implements UseCaseError {
  constructor (message: string) {
    super(message + " not exists")
  }
}