import { CreateUserInput, UserResponse } from "../../types/User";

export interface IUserService {
    findAll(): Promise<UserResponse[]>
    create(input: CreateUserInput): Promise<UserResponse>
}