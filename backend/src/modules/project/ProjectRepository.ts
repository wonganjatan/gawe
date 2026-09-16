import { prisma } from "../../lib/prisma";
import { ProjectCreateForm, ProjectResponse, ProjectUpdateForm } from "../../types/Project";
import { IProjectRepository } from "./IProjectRepository";

export class ProjectRepository implements IProjectRepository {
    async findAll(): Promise<ProjectResponse[]> {
        return await prisma.project.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                ownerId: true,
                members: true,
                startDate: true,
                dueDate: true,
                completedAt: true,
                tasks: true,
                createdAt: true
            }
        })
    }

    async findById(id: number): Promise<ProjectResponse | null> {
        return await prisma.project.findFirst({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                ownerId: true,
                members: true,
                startDate: true,
                dueDate: true,
                completedAt: true,
                tasks: true,
                createdAt: true
            }
        })
    }

    async create(newProject: ProjectCreateForm): Promise<void> {
        await prisma.project.create({
            data: newProject,
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                ownerId: true,
                members: true,
                startDate: true,
                dueDate: true,
                completedAt: true,
                tasks: true,
                createdAt: true
            }
        })
    }

    async update(id: number, data: ProjectUpdateForm): Promise<ProjectResponse> {
        return await prisma.project.update({
            where: { id },
            data: data,
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                ownerId: true,
                members: true,
                startDate: true,
                dueDate: true,
                completedAt: true,
                tasks: true,
                createdAt: true
            }
        })
    }
    
    async delete(id: number): Promise<void> {
        await prisma.project.delete({
            where: { id }
        })
    }
}