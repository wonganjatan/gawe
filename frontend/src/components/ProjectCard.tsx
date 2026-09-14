import { Link } from "react-router-dom";
import type { Project } from "../types/Project";

interface Props {
    project: Project
}

const statusStyle: Record<Project["status"], { style: string; label: string }> = {
    Planning: { style: "bg-slate-400", label: "Planning"},
    InProgress: { style: "bg-blue-500", label: "In Progress" },
    Completed: { style: "bg-emerald-500", label: "Completed" }
}

export default function ProjectCard({ project }: Props) {

    return (
        <div className="flex bg-white border border-slate-200 rounded-md overflow-hidden w-full max-w-sm">
            <div className={`w-1 shrink-0 ${statusStyle[project.status].style}`}/>
            <div className="flex-1 p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                    <h1>{project.name}</h1>
                    <span className="text-xs font-medium text-slate-500 whitespace-nowrap pt-0.5">{statusStyle[project.status].label}</span>
                </div>
                <p className="text-sm text-slate-500 leading-normal line-clamp-2">{project.description}</p>
                <Link to={`/projects/${project.id}`} className="flex items-center justify-center text-white border border-blue-500 rounded-xl px-2 py-1 bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer duration-300">View Details</Link>
            </div>
            
        </div>
    )
}