import { ProjectCreateForm } from "../../types/Project";

export interface IProjectRepository {
    create(form: ProjectCreateForm): Promise<void>
}