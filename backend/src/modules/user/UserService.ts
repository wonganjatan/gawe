import { CreateUserInput, UserResponse } from "../../types/User";
import { IUserRepository } from "./IUserRepository";
import { IUserService } from "./IUserService";
import bcrypt from "bcrypt"

export class UserService implements IUserService {
    private readonly userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async findAll(): Promise<UserResponse[]> {
        return await this.userRepository.findAll()
    }

    async create(input: CreateUserInput): Promise<UserResponse> {
        const hashedPassword = await bcrypt.hash(input.password, 10)

        return this.userRepository.create({
            firstName: input.firstName,
            lastName: input.lastName,
            username: input.username,
            email: input.email,
            hashedPassword
        })
    }
}