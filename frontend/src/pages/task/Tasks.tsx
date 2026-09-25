import { useEffect, useState } from "react"
import type { TaskResponse } from "../../types/Task"
import { tasksApi } from "../../api/tasks"
import TaskCard from "../../components/TaskCard"

export default function Tasks() {
    const [tasks, setTasks] = useState<TaskResponse[]>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const findAll = async () => {
            try {
                const tasks = await tasksApi.getAll()
                setTasks(tasks)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        findAll()
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }
    
    return (
        <div>
            <h1 className="font-bold text-2xl p-4 shadow-md">Tasks</h1>
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
            </div>
            <div className="p-4">
                {tasks?.map(task => (
                    <TaskCard key={task.id} task={task}/>
                ))}
            </div>
        </div>
    )
}