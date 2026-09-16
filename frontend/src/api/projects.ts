import type { Project, ProjectCreateForm } from "../types/Project";
import axios from "./axios";

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await axios.get<Project[]>("/projects");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axios.get(`/projects/${id}`);
    return response.data;
  },

  create: async (form: ProjectCreateForm) => {
    const response = await axios.post("/projects/new", form);
    return response.data;
  },

//   updateUser: async (userId: number, user: Partial<User>) => {
//     const response = await axios.put(`/users/${userId}`, user);
//     return response.data;
//   },

  delete: async (id: number) => {
    const response = await axios.delete(`/projects/${id}`);
    return response.data;
  },
};