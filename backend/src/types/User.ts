export type Role = "ADMIN" | "USER"

export interface User {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    hashedPassword: string
    role: Role
    createdAt: Date
}

export interface UserResponse {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    role: Role
    createdAt: Date
}

export interface CreateUserInput {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
}

export interface CreateUserDatabaseInput {
    firstName: string
    lastName: string
    username: string
    email: string
    hashedPassword: string
    role?: Role
}