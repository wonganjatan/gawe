import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../../types/Project";
import { projectsApi } from "../../api/projects";
import ProjectCard from "../../components/ProjectCard";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const findAll = async () => {
            try {
                const projects = await projectsApi.getAll()
                console.log(projects)
                setProjects(projects)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        findAll()
    }, [])
    
    return (
        <div>
            <h1 className="font-bold text-2xl p-4 shadow-md">Projects</h1>
            <div className="flex items-center justify-between p-4">
                <form

                >
                    <div className="flex items-center justify-center gap-2">
                        <label htmlFor="name">Search: </label>
                        <input 
                            type="text" 
                            className="border rounded-md"/>
                    </div>
                </form>
                <Link 
                    to="/projects/new" 
                    className="text-white border border-green-500 bg-green-500 rounded-lg px-2 hover:border-green-600 hover:bg-green-600 transition-colors duration-300">New Project</Link>
            </div>
            <div className="p-4">
                {projects?.map(project => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
            </div>
        </div>
    )
}