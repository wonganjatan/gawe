import type { AuthResponse } from "../types/Auth";
import type { CreateUserInput } from "../types/User";
import axios from "./axios";

export const authApi = {
  register: async (input: CreateUserInput): Promise<void> => {
    await axios.post<void>("/auth/register", input);
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await axios.post<AuthResponse>("/auth/login", { email, password })
    return res.data
  }
};