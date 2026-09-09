import type { Task } from "./Task"

export interface Project {
    id: number
    name: string
    description?: string
    status: "Planning" | "In Progress" | "Completed"
    ownerId: number
    memberIds?: number[]
    startDate: string
    dueDate: string
    completedAt: string | null
    tasks?: Task[]
    createdAt: string
}

export interface ProjectCreateForm {
    name: string
    description?: string
    ownerId: number
    memberIds?: number[]
    startDate: string
    dueDate: string
    completedAt?: string
    tasks?: Task[]
}