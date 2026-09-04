import { User } from "../../types/User";

export interface IUserRepository {
    findAll(): Promise<User[]>
}