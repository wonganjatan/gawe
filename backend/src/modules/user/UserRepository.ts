import { prisma } from "../../lib/prisma";
import { CreateUserDatabaseInput, CreateUserInput, User, UserResponse } from "../../types/User";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
     async register(newUser: CreateUserDatabaseInput): Promise<void> {
        await prisma.user.create({ 
            data: newUser,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                role: true,
                createdAt: true
            } 
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                hashedPassword: true,
                role: true,
                createdAt: true
            }
        })
    }

    async findAll(): Promise<UserResponse[]> {
        return prisma.user.findMany({ 
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                role: true,
                createdAt: true
            } 
        })
    }
}