import { Router } from "express";
import { UserController } from "../modules/user/UserController";
import { UserRepository } from "../modules/user/UserRepository";
import { UserService } from "../modules/user/UserService";

const router = Router();

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService);

router.get("/users", async (req, res) => {
    await userController.findAll(req, res);
});

router.post("/users/new", async (req, res) => {
    await userController.create(req, res)
})

export default router;