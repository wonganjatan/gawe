export interface Task {
    id: number
    title: string
    description?: string
    status: "Todo" | "In Progress" | "Done"
    priority?: "Low" | "Medium" | "High"
    projectId: number
    assignedId?: number
    dueDate?: string
    completedAt?: string
    createdAt: string
}