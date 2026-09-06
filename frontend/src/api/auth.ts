import type { CreateUserInput, User } from "../types/User";
import axios from "./axios";

export const authApi = {
  register: async (input: CreateUserInput): Promise<void> => {
    await axios.post<void>("/auth/register", input);
  },
};