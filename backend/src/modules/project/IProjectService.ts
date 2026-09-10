import { ProjectCreateForm, ProjectResponse } from "../../types/Project";

export interface IProjectService {
    findAll(): Promise<ProjectResponse[]>
    create(form: ProjectCreateForm): Promise<void>
}