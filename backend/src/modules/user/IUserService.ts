import { User } from "../../types/User";

export interface IUserService {
    findAll(): Promise<User[]>
}