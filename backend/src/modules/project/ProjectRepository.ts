import { prisma } from "../../lib/prisma";
import { ProjectCreateForm } from "../../types/Project";
import { IProjectRepository } from "./IProjectRepository";

export class ProjectRepository implements IProjectRepository {

    async create(form: ProjectCreateForm): Promise<void> {
        await prisma.project.create({
            data: form,
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                ownerId: true,
                startDate: true,
                dueDate: true,
                completedAt: true,
                tasks: true,
                createdAt: true
            }
        })
    }
    
}