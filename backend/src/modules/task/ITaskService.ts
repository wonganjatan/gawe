import { Task } from "../../../generated/prisma/browser";

export interface ITaskService {
    updateStatus(id: number, newSTatus: Task["status"]): Promise<void>
}