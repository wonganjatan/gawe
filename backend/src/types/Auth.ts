import { UserResponse } from "./User";

export interface AuthResponse {
    user: UserResponse
    token: string
}