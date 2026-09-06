import { Router } from "express";
import { UserRepository } from "../modules/user/UserRepository";
import { AuthService } from "../modules/auth/AuthService";
import { AuthController } from "../modules/auth/AuthController";

const router = Router();

const userRepository = new UserRepository()
const authService = new AuthService(userRepository)
const authController = new AuthController(authService);

router.post("/auth/register", async (req, res) => {
    await authController.register(req, res);
});

export default router;