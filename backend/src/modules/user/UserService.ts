import { User } from "../../types/User";
import { IUserRepository } from "./IUserRepository";
import { IUserService } from "./IUserService";

export class UserService implements IUserService {
    private readonly userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    findAll(): Promise<User[]> {
        return this.userRepository.findAll()
    }
}