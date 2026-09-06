import type { CreateUserInput, User } from "../types/User";
import axios from "./axios";

export const authApi = {
  register: async (input: CreateUserInput): Promise<void> => {
    await axios.post<void>("/auth/register", input);
  },

  login: async (email: string, password: string): Promise<User> => {
    const res = await axios.post<User>("/auth/login", { email, password })
    return res.data
  }
};