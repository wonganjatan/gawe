import { useParams } from "react-router-dom";
import type { Project } from "../../types/Project";
import type { Task } from "../../types/Task";
import { useEffect, useState } from "react";
import { projectsApi } from "../../api/projects";

const projectStatus: Record<Project["status"], { style: string; label: string }> = {
    Planning: { style: "bg-slate-400", label: "Planning"},
    InProgress: { style: "bg-blue-500 text-white", label: "In Progress" },
    Completed: { style: "bg-emerald-500 text-white", label: "Completed" }
}

const backlog: Record<Task["status"], { style: string; label: string }> ={
    Todo: { style: "bg-slate-400", label: "To do"},
    InProgress: { style: "bg-blue-500 text-white", label: "In Progress"},
    Done: { style: "bg-emerald-500 text-white", label: "Done"}
}

export default function ProjectDetails() {
    const { id } = useParams()
    const [project, setProject] = useState<Project | null>(null)

    useEffect(() => {
        const fetchProjectById = async (id: number) => {
            try {
                const data = await projectsApi.getById(id)
                setProject(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchProjectById(Number(id))
    })

    if (!project) {
        return <p>Project not found</p>
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="flex bg-white border-b border-slate-200">
                <div className={`w-1 shrink-0 ${projectStatus[project.status].style}`}></div>
                <div className="flex-1 p-6 flex flex-col gap-2">
                    <h1 className="text-xl font-semibold text-slate-800">
                        {project.name}
                    </h1>
                    <p className="text-sm text-slate-500 max-w-xl">
                        {project.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                        {new Date(project.dueDate).toLocaleDateString()}
                    </div>
                </div>
                <div className="flex items-center justify-center p-6">
                    <h1 className={`text-2xl border rounded-lg p-2 ${projectStatus[project.status].style}`}>{project.status}</h1>
                </div>
            </div>

            <div className="flex gap-4 p-6 overflow-x-auto">
                {Object.entries(backlog).map(([status, value]) => (
                    <div key={status} className="flex-1 min-w-60 flex flex-col gap-3">
                        <div className="flex items-center gap-2 px-1">
                            <h3 className="text-sm font-semibold text-slate-600">
                                {value.label}
                            </h3>
                            <span className="text-xs text-slate-400">
                                <p>({project.tasks?.filter(task => task.status === status).length})</p>
                            </span>
                        </div>

                        {(project.tasks?.filter(task => task.status === status).length ?? 0) > 0 ? (
                            <div className="flex flex-col gap-2">
                                {project.tasks?.filter(task => task.status === status).map(task => (
                                    <div className="bg-white border border-slate-200 rounded-md p-3 flex flex-col gap-2">
                                        <div className="flex items-start gap-2">
                                            <span className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${value.style}`}></span>
                                            <p className="text-sm text-slate-700 leading-snug">
                                                {task.title}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-slate-400 pl-4">
                                            {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-xs text-slate-300 border border-dashed border-slate-200 rounded-md p-3 text-center">
                                No tasks
                            </div>)
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}