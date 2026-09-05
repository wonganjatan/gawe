export interface User {
    id: number
    email: string
    name: string | null
}

export type CreateUserInput = Omit<User, 'id'>