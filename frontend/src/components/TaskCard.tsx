import React, { useState } from "react"
import type { Task, TaskResponse } from "../types/Task"
import { tasksApi } from "../api/tasks"

interface Props {
    task: TaskResponse
}

const taskPriority: Record<NonNullable<Task["priority"]>, { style: string }> = {
    Low: { style: "border-slate-300 bg-slate-300"},
    Medium: { style: "border-amber-400 bg-amber-400" },
    High: { style: "border-red-500 bg-red-500" }
}

export default function TaskCard({ task }: Props) {
    const [status, setStatus] = useState<TaskResponse["status"]>(task.status)

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as Task["status"]
        setStatus(newStatus)

        try {
            await tasksApi.updateStatus(task.id, newStatus)
        } catch (error) {
            console.error(error)
            setStatus(task.status)
        }
    }
    return(
        <div className="bg-white border border-slate-200 rounded-md p-3 flex flex-col gap-2">
            <div className="flex">
                <div className="flex flex-col items-start gap-2">
                    <p className="text-sm text-slate-700 leading-snug">
                        {task.title}
                    </p>
                    <p className="text-xs text-slate-400">
                        Due Date: {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <p className={`border rounded-md p-1 text-white ${task.priority ? taskPriority[task.priority].style : ""}`}>
                        {task.priority}
                    </p>
                    <select value={status} onChange={handleChange}>
                        <option value="Todo">To do</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </div>
        </div>
    )
}