import { ProjectCreateForm, ProjectResponse, ProjectUpdateForm } from "../../types/Project";

export interface IProjectRepository {
    findAll(): Promise<ProjectResponse[]>
    findById(id: number): Promise<ProjectResponse | null>
    create(newProject: ProjectCreateForm): Promise<void>
    update(id: number, data: ProjectUpdateForm): Promise<ProjectResponse>
    delete(id: number): Promise<void>
}