import type { Task } from "../types/Task"
import axios from "./axios"

export const tasksApi = {
    getAll: async (): Promise<Task[]> => {
        const response = await axios.get<Task[]>("/tasks");
        return response.data;
    },

    updateStatus: async (id: number, status: Task["status"]): Promise<void> => {
        await axios.put(`/tasks/${id}`, { status })
    }
}