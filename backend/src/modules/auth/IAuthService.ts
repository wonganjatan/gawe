import { AuthResponse } from "../../types/Auth";
import { CreateUserInput } from "../../types/User";

export interface IAuthService {
    register(input: CreateUserInput): Promise<void>
    login(email: string, password: string): Promise<AuthResponse>
}