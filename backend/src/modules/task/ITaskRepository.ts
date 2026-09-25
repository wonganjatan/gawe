import { Task, TaskCreateForm, TaskResponse } from "../../types/Task";

export interface ITaskRepository {
    findAll(): Promise<TaskResponse[]>
    findById(id: number): Promise<TaskResponse>
    create(task: TaskCreateForm): Promise<void>
    updateStatus(id: number, newStatus: Task["status"]): Promise<void>
}