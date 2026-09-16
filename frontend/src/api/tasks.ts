import type { Task } from "../types/Task"
import axios from "./axios"

export const tasksApi = {
    updateStatus: async (id: number, status: Task["status"]): Promise<void> => {
        await axios.put(`/tasks/${id}`, { status })
    }
}