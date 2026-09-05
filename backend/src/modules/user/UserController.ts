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

    async create(req: Request, res: Response) {
        const { newUser } = req.body

        try {
            const created = await this.userService.create(newUser)
            return res.status(201).json(created)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: "Failed to create a user"
            })
        }
    }
}