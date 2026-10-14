import { Request, Response } from 'express';
import { IUserService } from './IUserService';

export class UserController {
    private readonly userService: IUserService

    constructor(userService: IUserService) {
        this.userService = userService
    }

    async findAll(req: Request, res: Response) {
        try {
            const users = await this.userService.findAll()
        
            return res.json(users);
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: "Failed to get all users"
            })
        }
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params
        try {
            const user = await this.userService.findById(Number(id))

            return res.json(user)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: `Failed to get user id ${id}`
            })
        }
    }
}