import { CreateUserDatabaseInput, CreateUserInput, User, UserResponse } from "../../types/User";

export interface IUserRepository {
    register(input: CreateUserDatabaseInput): Promise<void>
    findAll(): Promise<UserResponse[]>
}