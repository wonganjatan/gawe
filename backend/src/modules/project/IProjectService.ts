import { ProjectCreateForm, ProjectResponse } from "../../types/Project";

export interface IProjectService {
    findAll(): Promise<ProjectResponse[]>
    findById(id: number): Promise<ProjectResponse | null>
    create(form: ProjectCreateForm): Promise<void>
    delete(id: number): Promise<void>
}