import { Request, Response } from 'express';
import { IProjectService } from './IProjectService';

export class ProjectController {
    private readonly projectService: IProjectService 

    constructor(projectService: IProjectService) {
        this.projectService = projectService
    }

    async create(req: Request, res: Response) {
        try {
            const created = await this.projectService.create(req.body)

            return res.json(created)
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: "Failed to create project"
            })
        }
    }
}