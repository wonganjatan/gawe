import { CreateUserInput, User } from "../../types/User";

export interface IUserService {
    findAll(): Promise<User[]>
    create(newUser: CreateUserInput): Promise<User>
}