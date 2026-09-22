import { Link, useNavigate, useParams } from "react-router-dom";
import type { ProjectResponse } from "../../types/Project";
import { useEffect, useState } from "react";
import { projectsApi } from "../../api/projects";
import TaskCard from "../../components/TaskCard";
import { Pencil, Trash2 } from "lucide-react";
import type { TaskResponse } from "../../types/Task";

const projectStatus: Record<ProjectResponse["status"], { style: string; label: string }> = {
    Planning: { style: "bg-slate-400 text-white", label: "Planning"},
    InProgress: { style: "bg-blue-500 text-white", label: "In Progress" },
    Completed: { style: "bg-emerald-500 text-white", label: "Completed" }
}

const backlog: Record<TaskResponse["status"], { style: string; label: string }> ={
    Todo: { style: "bg-slate-400", label: "To do"},
    InProgress: { style: "bg-blue-500 text-white", label: "In Progress"},
    Done: { style: "bg-emerald-500 text-white", label: "Done"}
}

export default function ProjectDetails() {
    const { id } = useParams()
    const [project, setProject] = useState<ProjectResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProjectById = async (id: number) => {
            try {
                const data = await projectsApi.getById(id)
                setProject(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProjectById(Number(id))
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    if (!project) {
        return <p>Project not found</p>
    }

    const handleDelete = async () => {
        try {
            await projectsApi.delete(project.id)
            navigate("/projects")
        } catch (error) {
            console.error(error)
        }
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
                    <div className="flex flex-col gap-1 text-xs text-slate-400 mt-1">
                        <span>Created At: {new Date(project.createdAt).toLocaleString()}</span>
                        <span>Due Date: {new Date(project.dueDate).toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 pr-8">
                    <span className={`font-medium rounded-md px-3 py-1.5 ${projectStatus[project.status].style}`}>
                        {project.status}
                    </span>
                    <Link to={`/projects/${project.id}/edit`}
                        className="text-slate-500 hover:text-slate-700 p-1.5 border border-slate-200 rounded-md hover:border-slate-300 cursor-pointer">
                        <Pencil className="h-4 w-4"/>
                    </Link>
                    <button 
                        type="submit" onClick={handleDelete}
                        className="text-red-500 hover:text-red-600 p-1.5 border border-slate-200 rounded-md hover:border-red-200 cursor-pointer">
                        <Trash2 className="h-4 w-4" />
                    </button>
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
                                    <TaskCard key={task.id} task={task} />
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