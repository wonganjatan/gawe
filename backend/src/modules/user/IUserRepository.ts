import { CreateUserDatabaseInput, CreateUserInput, User, UserResponse } from "../../types/User";

export interface IUserRepository {
    register(input: CreateUserDatabaseInput): Promise<void>
    findByEmail(email: string): Promise<User | null>
    findAll(): Promise<UserResponse[]>
}