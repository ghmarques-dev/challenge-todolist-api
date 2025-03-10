import { compare, hash } from "bcryptjs"
import { HashRepository } from "@/application/protocols/crypto"

export class BcryptHashRepository implements HashRepository {
  async create(input: HashRepository.Create.Input): HashRepository.Create.Output {
    const stringHashed = await hash(input.string, input.salt)

    return stringHashed
  }

  async compare(input: HashRepository.Compare.Input): HashRepository.Compare.Output {
    const hashCompare = await compare(input.string, input.hash)

    return hashCompare
  }
}