import { Request, Response } from 'express';
import { IProjectService } from './IProjectService';

export class ProjectController {
    private readonly projectService: IProjectService 

    constructor(projectService: IProjectService) {
        this.projectService = projectService
    }

    async findAll(req: Request, res: Response) {
        try {
            const projects = await this.projectService.findAll()
            return res.json(projects)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Failed to fetch Projects" })
        }
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params
        try {
            const project = await this.projectService.findById(Number(id))
            return res.json(project)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Failed to fetch project by id"})
        }
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

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const deleted = await this.projectService.delete(Number(id))
            return res.json(deleted)
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: "Failed to delete project"
            })
        }
    }
}