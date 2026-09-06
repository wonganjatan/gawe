import { Request, Response } from 'express';
import { IAuthService } from './IAuthService';

export class AuthController {
    private readonly authService: IAuthService

    constructor(authService: IAuthService) {
        this.authService = authService
    }

    async register(req: Request, res: Response) {
        const input = req.body

        try {
            const user = await this.authService.register(input)
        
            return res.json(user);
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: "Failed to register"
            })
        }
    }
}