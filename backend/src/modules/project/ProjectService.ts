import { ProjectCreateForm, ProjectResponse, ProjectUpdateForm } from "../../types/Project";
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

    async findById(id: number): Promise<ProjectResponse | null> {
        return this.projectRepository.findById(id)
    }

    async create(form: ProjectCreateForm): Promise<void> {
        return this.projectRepository.create(form)
    }

    async update(id: number, data: ProjectUpdateForm): Promise<ProjectResponse> {
        return this.projectRepository.update(id, data)
    }

    async delete(id: number): Promise<void> {
        return this.projectRepository.delete(id)
    }
}