import type { AuthResponse, SignUpForm } from "../types/Auth";
import axios from "./axios";

export const authApi = {
  register: async (input: SignUpForm): Promise<void> => {
    await axios.post<void>("/auth/register", input);
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await axios.post<AuthResponse>("/auth/login", { email, password })
    return res.data
  }
};