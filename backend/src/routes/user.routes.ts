import { Router } from "express";
import { UserController } from "../modules/user/UserController";
import { UserRepository } from "../modules/user/UserRepository";
import { UserService } from "../modules/user/UserService";

const router = Router();

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService);

router.get("/api/users", async (req, res) => {
    await userController.findAll(req, res);
});

export default router;