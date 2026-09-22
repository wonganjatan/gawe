import { Request, Response } from 'express';
import { Task } from "../../../generated/prisma/browser";
import { ITaskService } from "./ITaskService";

export class TaskController {
    private readonly taskService: ITaskService

    constructor(taskService: ITaskService) {
        this.taskService = taskService
    }

    async findAll(req: Request, res: Response) {
        try {
            const tasks = await this.taskService.findAll()
            return res.json(tasks)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Failed to fetch Tasks" })
        } 
    }

    async findById(req: Request, res: Response) {
        const id = Number(req.params.id)

        try {
            const task = await this.taskService.findById(id)
            return res.json(task)
        } catch (error) {
            console.error(error)
            return res.status(404).json({
                message: "Task not found"
            })
        }
    }

    async updateStatus(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id)
        const { status } = req.body
        
        try {
            await this.taskService.updateStatus(id, status)
            res.status(200).json({ message: `Task ${id} status successfully updated` })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: `Failed to update Task ${id}` })
        }
    }
}