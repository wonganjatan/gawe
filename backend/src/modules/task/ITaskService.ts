import { Task } from "../../../generated/prisma/browser";
import { TaskResponse } from "../../types/Task";

export interface ITaskService {
    findAll(): Promise<TaskResponse[]>
    findById(id: number): Promise<TaskResponse>
    updateStatus(id: number, newSTatus: Task["status"]): Promise<void>
}