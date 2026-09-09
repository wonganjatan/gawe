import { ProjectCreateForm } from "../../types/Project";

export interface IProjectService {
    create(form: ProjectCreateForm): Promise<void>
}