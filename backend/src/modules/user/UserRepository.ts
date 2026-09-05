import { CreateUserInput, User } from "../../types/User";
import { IUserRepository } from "./IUserRepository";
import { db } from '../../prisma/db';

export class UserRepository implements IUserRepository {
    async findAll(): Promise<User[]> {
        return db.orm.public.User
            .select("id", "email", "name")
            .all()
    }

    async create(newUser: CreateUserInput): Promise<User> {
        return db.orm.public.User
            .create(newUser)
    }
}