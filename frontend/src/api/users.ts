import type { User } from "../types/User";
import axios from "./axios";

export const usersApi = {

  getAllUsers: async (): Promise<User[]> => {
    const response = await axios.get<User[]>("/users");
    return response.data;
  },

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