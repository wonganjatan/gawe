import { CreateUserInput, User } from "../../types/User";

export interface IUserRepository {
    findAll(): Promise<User[]>
    create(newUser: CreateUserInput): Promise<User>
}