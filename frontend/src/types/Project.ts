import type { Task, TaskResponse } from "./Task"
import type { User } from "./User"

export interface Project {
    id: number
    name: string
    description?: string
    status: "Planning" | "In Progress" | "Completed"
    ownerId: number
    members?: User[]
    startDate: string
    dueDate: string
    completedAt: string | null
    tasks?: Task[]
    createdAt: string
}

export interface ProjectResponse {
    id: number
    name: string
    description?: string | null
    status: "Planning" | "InProgress" | "Completed"
    ownerId: number
    members?: User[] | null
    startDate: Date
    dueDate: Date
    completedAt?: Date | null
    tasks?: TaskResponse[] | null
    createdAt: Date
}

export interface ProjectCreateForm {
    name: string
    description?: string
    ownerId: number
    startDate: string
    dueDate: string
}