import { ProjectCreateForm, ProjectResponse } from "../../types/Project";

export interface IProjectRepository {
    findAll(): Promise<ProjectResponse[]>
    create(newProject: ProjectCreateForm): Promise<void>
}