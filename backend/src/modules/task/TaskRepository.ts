import { prisma } from "../../lib/prisma";
import { Task, TaskCreateForm, TaskResponse } from "../../types/Task";
import { ITaskRepository } from "./ITaskRepository";

export class TaskRepository implements ITaskRepository {
    async findAll(): Promise<TaskResponse[]> {
        return await prisma.task.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                projectId: true,
                assignedId: true,
                dueDate: true,
                completedAt: true,
                createdAt: true
            }
        })
    }

    async findById(id: number): Promise<TaskResponse> {
        return await prisma.task.findFirstOrThrow({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                projectId: true,
                assignedId: true,
                dueDate: true,
                completedAt: true,
                createdAt: true
            }
        })
    }

    async create(newTask: TaskCreateForm): Promise<void> {
        prisma.task.create({
            data: newTask,
            select: {
                title: true,
                description: true,
                status: true,
                priority: true,
                projectId: true,
                assignedId: true,
                dueDate: true,
                createdAt: true
            }
        })
    }

    async updateStatus(id: number, newStatus: Task["status"]): Promise<void> {
        await prisma.task.update({
            where: { id },
            data: { status: newStatus }
        })
    }
}