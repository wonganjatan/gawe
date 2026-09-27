import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import type { TaskCreateForm } from "../../types/Task"
import { useForm } from "react-hook-form"
import axios from "axios"

export default function TaskCreate() {
    const { loggedInUser } = useAuthContext()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<TaskCreateForm>()

    const onSubmit = async (data: TaskCreateForm) => {
        try {
            const payload = {
                ...data,
                ownerId: loggedInUser?.id
            }

            await axios.post("/projects/new", payload)
            navigate("/")
        } catch (error) {
            setError("root", { message: "Failed to create project. Please try again" })
        }
    }
    return (
        <main className="flex flex-col min-h-screen w-full bg-gray-50">
            <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Task</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                        <div className="flex flex-col">
                            <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">Title:<span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                id="title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                {...register("title")}
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description:</label>
                            <textarea 
                                id="description"
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                {...register("description")}
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>

                        <div className="flex gap-3">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">Status:</label>
                                <select 
                                    id="status"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    {...register("status")}
                                >
                                    <option value="Todo">To do</option>
                                    <option value="InProgress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="priority" className="text-sm font-medium text-gray-700 mb-1">Priority:</label>
                                <select 
                                    id="priority"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    {...register("priority")}
                                >
                                    <option value="">None</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="projectId" className="text-sm font-medium text-gray-700 mb-1">Project ID:<span className="text-red-500">*</span></label>
                                <input 
                                    type="number" 
                                    id="projectId"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    {...register("projectId")}
                                />
                                {errors.projectId && <p className="text-red-500 text-xs mt-1">{errors.projectId.message}</p>}
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="assignedId" className="text-sm font-medium text-gray-700 mb-1">Assigned To (User ID):</label>
                                <input 
                                    type="number" 
                                    id="assignedId"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    {...register("assignedId")}
                                />
                                {errors.assignedId && <p className="text-red-500 text-xs mt-1">{errors.assignedId.message}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="dueDate" className="text-sm font-medium text-gray-700 mb-1">Due date:</label>
                            <input 
                                type="datetime-local" 
                                id="dueDate"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                {...register("dueDate")}
                            />
                            {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate.message}</p>}
                        </div>

                        {errors.root && <p className="text-red-500 text-sm text-center">{errors.root.message}</p>}

                        <button 
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full bg-blue-500 hover:bg-blue-600 cursor-pointer transition-colors text-white font-semibold py-2 rounded-lg mt-2'>
                            {isSubmitting ? "Creating..." : "Create"}
                        </button>
                        <Link to="/" className="w-full flex justify-center border border-blue-500 rounded-xl hover:bg-gray-200 px-2 py-1 transition-colors duration-300">Cancel</Link>
                    </form>
                </div>
            </div>
        </main>
    )
}