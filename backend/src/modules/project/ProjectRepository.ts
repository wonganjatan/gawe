import { prisma } from "../../lib/prisma";
import { ProjectCreateForm, ProjectResponse } from "../../types/Project";
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
    
}