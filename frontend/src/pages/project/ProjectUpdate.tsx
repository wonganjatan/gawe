import { useForm } from "react-hook-form"
import type { ProjectUpdateForm } from "../../types/Project"
import { useEffect } from "react"
import { projectsApi } from "../../api/projects"
import { useNavigate, useParams } from "react-router-dom"

export default function ProjectUpdate() {
    const { id } = useParams()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        getValues,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ProjectUpdateForm>()

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const project = await projectsApi.getById(Number(id))
                const toDateTimeLocal = (isoString: string) => isoString.slice(0, 16)
                reset({
                    name: project.name,
                    description: project.description ?? "",
                    status: project.status,
                    startDate: toDateTimeLocal(project.startDate),
                    dueDate: toDateTimeLocal(project.dueDate)
                })
            } catch (error) {
                console.error(error)
            }
        }

        fetchProject()
    }, [])

    const onSubmit = async (data: ProjectUpdateForm) => {
        try {
            
            navigate("/projects")
        } catch (error) {
            console.error(error)
            setError("root", { message: "Failed to update project. Please try again" })
        }
    } 

    return (
        <main className="flex flex-col min-h-screen w-full bg-gray-50">
            <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Project</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Name:<span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                id="name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                placeholder="Project name"
                                {...register("name", {
                                    required: "Project name is required"
                                })}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description:</label>
                            <textarea 
                                id="description"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                placeholder="What's this project about?"
                                rows={3}
                                {...register("description")}
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">Status:</label>
                            <select 
                                id="status"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                {...register("status")}
                            >
                                <option value="Planning">Planning</option>
                                <option value="InProgress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-1">Start Date:</label>
                                <input 
                                    type="datetime-local" 
                                    id="startDate"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    {...register("startDate", {
                                        required: "Start date is required"
                                    })}
                                />
                                {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="dueDate" className="text-sm font-medium text-gray-700 mb-1">Due Date:</label>
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
                        </div>
                        {errors.root && <p className="text-red-500 text-sm text-center">{errors.root.message}</p>}

                        <button 
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer transition-colors text-white font-semibold py-2 rounded-lg mt-2"
                        >
                            {isSubmitting ? "Saving Changes" : "Save Changes"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}