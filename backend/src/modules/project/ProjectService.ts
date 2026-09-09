import { ProjectCreateForm } from "../../types/Project";
import { IProjectRepository } from "./IProjectRepository";
import { IProjectService } from "./IProjectService";

export class ProjectService implements IProjectService {
    private readonly projectRepository: IProjectRepository

    constructor(projectRepository: IProjectRepository) {
        this.projectRepository = projectRepository
    }

    async create(form: ProjectCreateForm): Promise<void> {
        return await this.projectRepository.create(form)
    }
}