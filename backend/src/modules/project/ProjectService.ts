import { ProjectCreateForm, ProjectResponse } from "../../types/Project";
import { IProjectRepository } from "./IProjectRepository";
import { IProjectService } from "./IProjectService";

export class ProjectService implements IProjectService {
    private readonly projectRepository: IProjectRepository

    constructor(projectRepository: IProjectRepository) {
        this.projectRepository = projectRepository
    }

    async findAll(): Promise<ProjectResponse[]> {
        return this.projectRepository.findAll()
    }

    async create(form: ProjectCreateForm): Promise<void> {
        return this.projectRepository.create(form)
    }
}