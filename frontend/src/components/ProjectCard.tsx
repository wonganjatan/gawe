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
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-medium text-slate-400">#{project.id}</p>
                <p className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[project.status].style}`}>
                    {statusStyle[project.status].label}
                </p>
            </div>

            <p className="mb-2 text-lg font-semibold text-slate-900">{project.name}</p>
            <p className="line-clamp-2 text-sm text-slate-500">{project.description}</p>

            <div className="mt-4 border-t border-slate-100 pt-3">
                <Link
                    to={`/projects/${project.id}`}
                    className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
                >
                    View details →
                </Link>
            </div>
        </div>
    )
}