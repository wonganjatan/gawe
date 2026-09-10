import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../../types/Project";
import { projectsApi } from "../../api/projects";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>()

    useEffect(() => {
        const findAll = async () => {
            try {
                const projects = await projectsApi.getAll()
                console.log(projects)
                setProjects(projects)
            } catch (error) {
                console.error(error)
            }
        }

        findAll()
    }, [])
    
    return (
        <div>
            <Link to="/projects/new">New Project</Link>
            {projects?.map(project => (
                <div key={project.id}>
                    <p>{project.name}</p>
                </div>
            ))}
        </div>
    )
}