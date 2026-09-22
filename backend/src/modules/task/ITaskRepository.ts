import { Task, TaskResponse } from "../../types/Task";

export interface ITaskRepository {
    findAll(): Promise<TaskResponse[]>
    findById(id: number): Promise<TaskResponse>
    updateStatus(id: number, newStatus: Task["status"]): Promise<void>
}