import { ProjectCreateForm, ProjectResponse, ProjectUpdateForm } from "../../types/Project";

export interface IProjectService {
    findAll(): Promise<ProjectResponse[]>
    findById(id: number): Promise<ProjectResponse | null>
    create(form: ProjectCreateForm): Promise<void>
    update(id: number, data: ProjectUpdateForm): Promise<ProjectResponse>
    delete(id: number): Promise<void>
}