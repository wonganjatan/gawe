export interface Task {
    id: number
    title: string
    description?: string
    status: "Todo" | "InProgress" | "Done"
    priority?: "Low" | "Medium" | "High"
    projectId: number
    assignedId?: number
    dueDate?: string 
    completedAt?: string
    createdAt: string
}

export interface TaskResponse {
    id: number
    title: string
    description?: string | null
    status: "Todo" | "InProgress" | "Done"
    priority?: "Low" | "Medium" | "High" | null
    projectId: number
    assignedId?: number | null
    dueDate?: Date  | null
    completedAt?: Date | null
    createdAt: Date
}