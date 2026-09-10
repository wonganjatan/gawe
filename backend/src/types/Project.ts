import { User } from "../../generated/prisma/browser"
import type { Task, TaskResponse } from "./Task"

export interface Project {
    id: number
    name: string
    description?: string | null
    status: "Planning" | "InProgress" | "Completed"
    ownerId: number
    members?: User[]
    startDate: string
    dueDate: string
    completedAt?: string
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