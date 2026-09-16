import { Task } from "../../../generated/prisma/browser";
import { ITaskRepository } from "./ITaskRepository";
import { ITaskService } from "./ITaskService";

export class TaskService implements ITaskService {
    private readonly taskRepository: ITaskRepository

    constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository
    }

    async updateStatus(id: number, newStatus: Task["status"]): Promise<void> {
        await this.taskRepository.updateStatus(id, newStatus)
    }
}