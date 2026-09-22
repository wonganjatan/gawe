import { Task } from "../../../generated/prisma/browser";
import { TaskResponse } from "../../types/Task";
import { ITaskRepository } from "./ITaskRepository";
import { ITaskService } from "./ITaskService";

export class TaskService implements ITaskService {
    private readonly taskRepository: ITaskRepository

    constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository
    }

    async findAll(): Promise<TaskResponse[]> {
        return this.taskRepository.findAll()
    }

    async findById(id: number): Promise<TaskResponse> {
        return this.taskRepository.findById(id)
    }

    async updateStatus(id: number, newStatus: Task["status"]): Promise<void> {
        await this.taskRepository.updateStatus(id, newStatus)
    }
}