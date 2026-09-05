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

//   getUserById: async (userId: number) => {
//     const response = await axios.get(`/users/${userId}`);
//     return response.data;
//   },

//   createUser: async (user: Partial<User>) => {
//     const response = await axios.post("/users", user);
//     return response.data;
//   },

//   updateUser: async (userId: number, user: Partial<User>) => {
//     const response = await axios.put(`/users/${userId}`, user);
//     return response.data;
//   },

//   deleteUser: async (userId: number) => {
//     const response = await axios.delete(`/users/${userId}`);
//     return response.data;
//   },
};