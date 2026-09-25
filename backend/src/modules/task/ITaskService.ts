import { Task } from "../../../generated/prisma/browser";
import { TaskCreateForm, TaskResponse } from "../../types/Task";

export interface ITaskService {
    findAll(): Promise<TaskResponse[]>
    findById(id: number): Promise<TaskResponse>
    create(newTask: TaskCreateForm): Promise<void>
    updateStatus(id: number, newSTatus: Task["status"]): Promise<void>
}