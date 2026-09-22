import type { Task, TaskResponse } from "../types/Task"
import axios from "./axios"

export const tasksApi = {
    getAll: async (): Promise<TaskResponse[]> => {
        const response = await axios.get<TaskResponse[]>("/tasks");
        return response.data;
    },

    updateStatus: async (id: number, status: Task["status"]): Promise<void> => {
        await axios.put(`/tasks/${id}`, { status })
    }
}