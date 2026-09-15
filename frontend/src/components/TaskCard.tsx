import type { Task } from "../types/Task"

interface Props {
    task: Task
}

export default function TaskCard({ task }: Props) {
    return(
        <div className="bg-white border border-slate-200 rounded-md p-3 flex flex-col gap-2">
            <div className="flex items-start gap-2">
                <p className="text-sm text-slate-700 leading-snug">
                    {task.title}
                </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400">
                <p>
                    Due Date: {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
                </p>
            </div>
        </div>
    )
}