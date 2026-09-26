import type { Task, TaskCreateForm, TaskResponse } from "../types/Task"
import axios from "./axios"

export const tasksApi = {
    getAll: async (): Promise<TaskResponse[]> => {
        const response = await axios.get<TaskResponse[]>("/tasks");
        return response.data;
    },

    getById: async (id: number): Promise<TaskResponse> => {
        const res = await axios.get<TaskResponse>(`/tasks/${id}`)
        return res.data
    },

    create: async (newTask: TaskCreateForm): Promise<void> => {
        await axios.post<void>("/tasks/new", newTask)
    },

    updateStatus: async (id: number, status: Task["status"]): Promise<void> => {
        await axios.put(`/tasks/${id}`, { status })
    }
}