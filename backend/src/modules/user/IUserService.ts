import { UserResponse } from "../../types/User";

export interface IUserService {
    findAll(): Promise<UserResponse[]>
}