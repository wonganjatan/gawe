import { Request, Response } from 'express';

import { db } from '../prisma/db';

export class UserController {
    async findAllUsers(req: Request, res: Response) {
        try {
            const users = await db.orm.public.User
            .select("id", "email", "name")
            .all()
        
            return res.json(users);
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: "Failed to get all users"
            })
        }
    }
}