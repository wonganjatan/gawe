import { Link, useNavigate, useParams } from "react-router-dom";
import type { TaskResponse } from "../../types/Task";
import { useEffect, useState } from "react";
import { tasksApi } from "../../api/tasks";
import { ArrowLeft, Calendar, Flag, FolderKanban, Hash, Pencil, Trash2 } from "lucide-react";

const statusStyle = {
  Todo: "bg-slate-100 text-slate-600",
  InProgress: "bg-blue-100 text-blue-700",
  Done: "bg-emerald-100 text-emerald-700",
};
 
const statusLabel = {
  Todo: "To do",
  InProgress: "In Progress",
  Done: "Done",
};
 
const priorityStyle = {
  Low: "bg-slate-100 text-slate-500",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-red-100 text-red-600",
};


export default function TaskDetails() {
    const { id } = useParams()
    const [task, setTask] = useState<TaskResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    // const navigate = useNavigate()

    useEffect(() => {
        const fetchTaskById = async (id: number) => {
            try {
                const data = await tasksApi.getById(id)
                setTask(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchTaskById(Number(id))
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    if (!task) {
        return <p>Task not found</p>
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-lg flex flex-col items-center text-center gap-4">
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium rounded-full px-2.5 py-1 ${statusStyle[task.status]}`}>
                    {statusLabel[task.status]}
                    </span>
                    {task.priority && (
                    <span className={`text-xs font-medium rounded-full px-2.5 py-1 flex items-center gap-1 ${priorityStyle[task.priority]}`}>
                        <Flag className="h-3 w-3" />
                        {task.priority}
                    </span>
                    )}
                </div>
        
                <h1 className="text-2xl font-semibold text-slate-800 leading-snug">
                    {task.title}
                </h1>
        
                {task.description ? (
                    <p className="text-sm text-slate-500 leading-relaxed">
                    {task.description}
                    </p>
                ) : (
                    <p className="text-sm text-slate-300 italic">No description</p>
                )}
        
                <div className="w-full flex flex-col gap-2 text-sm text-slate-500 pt-3 text-left bg-white border border-slate-200 rounded-md p-4">
                    <div className="flex items-center gap-2">
                    <Hash className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-400 w-24 shrink-0">Task ID</span>
                    <span>{task.id}</span>
                    </div>
        
                    <div className="flex items-center gap-2">
                    <FolderKanban className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-400 w-24 shrink-0">Project</span>
                    <Link to={`/projects/${task.projectId}`} className="text-blue-600 hover:underline">
                        #{task.projectId}
                    </Link>
                    </div>
        
                    <div className="flex items-center gap-2">
                    <span className="text-slate-400 w-24 shrink-0">Assigned to</span>
                    <span>{task.assignedId ? `User #${task.assignedId}` : <span className="text-slate-300 italic">Unassigned</span>}</span>
                    </div>
        
                    <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-400 w-24 shrink-0">Due date</span>
                    <span>{task.dueDate ? new Date(task.dueDate).toLocaleString() : <span className="text-slate-300 italic">Not set</span>}</span>
                    </div>
        
                    <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-400 w-24 shrink-0">Completed</span>
                    <span>{task.completedAt ? new Date(task.completedAt).toLocaleString() : <span className="text-slate-300 italic">Not completed</span>}</span>
                    </div>
        
                    <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-400 w-24 shrink-0">Created</span>
                    <span>{new Date(task.createdAt).toLocaleString()}</span>
                    </div>
                </div>
                </div>
            </div>
        
            {/* bottom action bar */}
            <div className="border-t border-slate-200 bg-white py-4 flex items-center justify-center gap-3">
                <Link
                to="/tasks"
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 px-3 py-2 rounded-md border border-slate-200 hover:border-slate-300"
                >
                <ArrowLeft className="h-4 w-4" />
                Back
                </Link>
                <Link
                to={`/tasks/${task.id}/edit`}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 px-3 py-2 rounded-md border border-slate-200 hover:border-slate-300"
                >
                <Pencil className="h-4 w-4" />
                Edit
                </Link>
                <button className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 px-3 py-2 rounded-md border border-slate-200 hover:border-red-200">
                <Trash2 className="h-4 w-4" />
                Delete
                </button>
            </div>
        </div>
    )
}