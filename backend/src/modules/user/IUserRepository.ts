import { CreateUserDatabaseInput, UserResponse } from "../../types/User";

export interface IUserRepository {
    findAll(): Promise<UserResponse[]>
    create(newUser: CreateUserDatabaseInput): Promise<UserResponse>
}