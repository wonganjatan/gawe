import { CreateUserInput, UserResponse } from "../../types/User";
import bcrypt from "bcrypt"
import { IAuthService } from "./IAuthService";
import { IUserRepository } from "../user/IUserRepository";

export class AuthService implements IAuthService {
    private readonly userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async register(input: CreateUserInput): Promise<void> {
        const hashedPassword = await bcrypt.hash(input.password, 10)

        await this.userRepository.register({
            firstName: input.firstName,
            lastName: input.lastName,
            username: input.username,
            email: input.email,
            hashedPassword
        })
    }
}