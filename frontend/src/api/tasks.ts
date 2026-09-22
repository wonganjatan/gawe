import type { Task, TaskResponse } from "../types/Task"
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

    updateStatus: async (id: number, status: Task["status"]): Promise<void> => {
        await axios.put(`/tasks/${id}`, { status })
    }
}