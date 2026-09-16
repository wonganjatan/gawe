import { Task } from "../../../generated/prisma/browser";
import { ITaskService } from "./ITaskService";

export class TaskController {
    private readonly taskService: ITaskService

    constructor(taskService: ITaskService) {
        this.taskService = taskService
    }

    async updateStatus(id: number, newStatus: Task["status"]): Promise<void> {
        await this.taskService.updateStatus(id, newStatus)
    }
}