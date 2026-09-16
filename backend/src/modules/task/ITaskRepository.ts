import { Task } from "../../types/Task";

export interface ITaskRepository {
    updateStatus(id: number, newStatus: Task["status"]): Promise<void>
}