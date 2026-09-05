export type Role = "ADMIN" | "USER"

export interface User {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    hashedPassword: string
    role: Role
    createdAt: string
}

export interface CreateUserRequest {
    firstName: string
    lastName: string
    username: string
    email: string
    hashedPassword: string
}