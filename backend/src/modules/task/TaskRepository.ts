import { prisma } from "../../lib/prisma";
import { Task } from "../../types/Task";
import { ITaskRepository } from "./ITaskRepository";

export class TaskRepository implements ITaskRepository {
    async updateStatus(id: number, newStatus: Task["status"]): Promise<void> {
        await prisma.task.update({
            where: { id },
            data: { status: newStatus }
        })
    }
}