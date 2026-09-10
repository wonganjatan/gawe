import { Router } from "express";
import { ProjectRepository } from "../modules/project/ProjectRepository";
import { ProjectService } from "../modules/project/ProjectService";
import { ProjectController } from "../modules/project/ProjectController";

const router = Router()

const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository)
const projectController = new ProjectController(projectService)

router.get("/projects", async (req, res) => {
    await projectController.findAll(req, res)
})

router.post("/projects/new", async (req, res) => {
    await projectController.create(req, res)
})

export default router