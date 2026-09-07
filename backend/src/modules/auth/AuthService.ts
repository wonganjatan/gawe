import { CreateUserInput } from "../../types/User";
import bcrypt from "bcrypt"
import { IAuthService } from "./IAuthService";
import { IUserRepository } from "../user/IUserRepository";
import jwt from 'jsonwebtoken'
import { AuthResponse } from "../../types/Auth";

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

    async login(email: string, password: string): Promise<AuthResponse> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new Error("Invalid credentials")
        }

        const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword)

        if (!isPasswordMatch) {
            throw new Error("Invalid credentials")
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '2h' }
        )

        const { hashedPassword, ...safeUser } = user
        return { token, user: safeUser }
    }
}