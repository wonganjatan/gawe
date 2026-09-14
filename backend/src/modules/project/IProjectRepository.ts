import { ProjectCreateForm, ProjectResponse } from "../../types/Project";

export interface IProjectRepository {
    findAll(): Promise<ProjectResponse[]>
    findById(id: number): Promise<ProjectResponse | null>
    create(newProject: ProjectCreateForm): Promise<void>
}