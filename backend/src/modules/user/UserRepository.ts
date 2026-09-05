import { prisma } from "../../lib/prisma";
import { CreateUserDatabaseInput, UserResponse } from "../../types/User";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
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

    async create(newUser: CreateUserDatabaseInput): Promise<UserResponse> {
        return prisma.user.create({ 
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
}