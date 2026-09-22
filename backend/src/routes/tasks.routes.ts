import { Router } from "express";
import { TaskRepository } from "../modules/task/TaskRepository";
import { TaskService } from "../modules/task/TaskService";
import { TaskController } from "../modules/task/TaskController";

const router = Router()

const taskRepository = new TaskRepository()
const taskService = new TaskService(taskRepository)
const taskController = new TaskController(taskService)

router.get("/tasks", async (req, res) => {
    return taskController.findAll(req, res)
})

router.put("/tasks/:id", async (req, res) => {
    return taskController.updateStatus(req, res)
})

export default router