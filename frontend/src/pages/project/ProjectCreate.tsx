import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import { useForm } from "react-hook-form"
import type { ProjectCreateForm } from "../../types/Project"
import axios from "../../api/axios"

export default function ProjectCreate() {
    const { loggedInUser } = useAuthContext()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        getValues,
        formState: { errors, isSubmitting }
    } = useForm<ProjectCreateForm>()

    const onSubmit = async (data: ProjectCreateForm) => {
        try {
            const payload = {
                ...data,
                ownerId: loggedInUser?.id,
                startDate: new Date(data.startDate).toISOString(),
                dueDate: new Date(data.dueDate).toISOString()
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
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Project</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex gap-3">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Project Name:<span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    id="name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    {...register("name", { 
                                        required: "Project name is required",
                                    })}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description:</label>
                                <input 
                                    type="text" 
                                    id="description"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    {...register("description")}
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                            <div className="flex flex-col">
                                <label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-1">Start date:</label>
                                <input 
                                    type="datetime-local" 
                                    id="startDate"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    {...register("startDate", {
                                        required: "Start date is required"
                                    })}/>
                                {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="dueDate" className="text-sm font-medium text-gray-700 mb-1">Due date:</label>
                                <input 
                                    type="datetime-local" 
                                    id="dueDate"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    {...register("dueDate", { 
                                        required: "Due date is required",
                                        validate: value => {
                                            const start = getValues("startDate")
                                            if (new Date(value) <= new Date(start)) {
                                                return "Due date must be after than start date"
                                            }
                                            return true
                                        }
                                    })}
                                />
                                {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate.message}</p>}
                            </div>
                            {errors.root && <p className="text-red-500 text-sm text-center">{errors.root.message}</p>}
                        </div>

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