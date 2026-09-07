import type { User } from "./User"

export interface AuthResponse {
    user: User
    token: string
}

export interface SignInForm {
    email: string
    password: string
}

export interface SignUpForm {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    confirmPassword: string
}