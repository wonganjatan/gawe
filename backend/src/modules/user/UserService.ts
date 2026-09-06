import { CreateUserInput, UserResponse } from "../../types/User";
import { IUserRepository } from "./IUserRepository";
import { IUserService } from "./IUserService";

export class UserService implements IUserService {
    private readonly userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async findAll(): Promise<UserResponse[]> {
        return await this.userRepository.findAll()
    }
}