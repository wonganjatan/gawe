import "dotenv/config";
import bcrypt from 'bcrypt'
import { prisma } from "../lib/prisma"

const ADMIN_EMAIL = process.env.INITIAL_ADMIN_EMAIL || "example@email.com"
const ADMIN_PASSWORD = process.env.INITIAL_ADMIN_PASSWORD || "abc123"

export default async function seedData() {
    const isExists = await prisma.user.findFirst({ 
        where: {
            username: "admin"
        }
    })
    
    if (isExists) {
        console.log("Admin is already exist")
        return
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const admin = await prisma.user.create({
        data: {
            firstName: "Admin",
            lastName: "User",
            username: "admin",
            email: ADMIN_EMAIL,
            hashedPassword,
            role: "Admin"
        }
    });

    const ren = await prisma.user.create({
        data: {
            firstName: "Ren",
            lastName: "Oyama",
            username: "renoyama",
            email: "ren@email.com",
            hashedPassword,
            role: "User",
        },
    });

    const priya = await prisma.user.create({
        data: {
            firstName: "Priya",
            lastName: "Nair",
            username: "priyanair",
            email: "priya@email.com",
            hashedPassword,
            role: "User",
        },
    });

    const planningProject = await prisma.project.create({
        data: {
            name: "Warehouse Inventory Revamp",
            description: "Rebuild the stock tracking flow so floor staff can update counts from mobile.",
            status: "Planning",
            ownerId: admin.id,
            startDate: new Date("2026-10-05"),
            dueDate: new Date("2026-12-01"),
            members: { connect: [{ id: ren.id }] },
        },
    });

    const inProgressProject = await prisma.project.create({
        data: {
            name: "Customer Portal v2",
            description: "New self-serve billing pages and account settings, replacing the old dashboard.",
            status: "InProgress",
            ownerId: admin.id,
            startDate: new Date("2026-08-01"),
            dueDate: new Date("2026-09-28"),
            members: { connect: [{ id: ren.id }, { id: priya.id }] },
        },
    });

    const completedProject = await prisma.project.create({
        data: {
            name: "Onboarding Email Series",
            description: "Five-part welcome sequence for new signups, handed off to marketing.",
            status: "Completed",
            ownerId: admin.id,
            startDate: new Date("2026-06-01"),
            dueDate: new Date("2026-08-15"),
            completedAt: new Date("2026-08-14"),
            members: { connect: [{ id: priya.id }] },
        },
    });

    await prisma.project.create({
        data: {
            name: "Mobile App Redesign",
            description: "Not started yet — no tasks defined.",
            status: "Planning",
            ownerId: admin.id,
            startDate: new Date("2026-11-01"),
            dueDate: new Date("2027-01-15"),
        },
    });

    await prisma.task.createMany({
        data: [
            {
                title: "Define data model for stock counts",
                status: "Todo",
                priority: "High",
                projectId: planningProject.id,
                dueDate: new Date("2026-10-15"),
            },
            {
                title: "Interview floor staff about current pain points",
                status: "Todo",
                priority: "Medium",
                projectId: planningProject.id,
                dueDate: new Date("2026-10-10"),
            },
            {
                title: "Research offline-first mobile patterns",
                status: "Todo",
                projectId: planningProject.id,
            },
            {
                title: "Build invoice history table",
                status: "InProgress",
                priority: "Medium",
                projectId: inProgressProject.id,
                assignedId: ren.id,
                dueDate: new Date("2026-09-20"),
            },
            {
                title: "Add payment method form",
                status: "InProgress",
                priority: "High",
                projectId: inProgressProject.id,
                assignedId: priya.id,
                dueDate: new Date("2026-09-25"),
            },
            {
                title: "Wire up account settings API",
                status: "Todo",
                priority: "Low",
                projectId: inProgressProject.id,
            },
            {
                title: "Write onboarding tooltip copy",
                status: "Todo",
                priority: "Low",
                projectId: inProgressProject.id,
                assignedId: priya.id,
            },
            {
                title: "QA pass on mobile breakpoints",
                status: "Todo",
                priority: "Medium",
                projectId: inProgressProject.id,
            },
            {
                title: "Design billing summary layout",
                status: "Done",
                priority: "Medium",
                projectId: inProgressProject.id,
                assignedId: ren.id,
                completedAt: new Date("2026-09-10"),
            },
            {
                title: "Set up Stripe webhook handler",
                status: "Done",
                priority: "High",
                projectId: inProgressProject.id,
                assignedId: priya.id,
                completedAt: new Date("2026-09-12"),
            },
            {
                title: "Draft welcome email copy",
                status: "Done",
                priority: "Low",
                projectId: completedProject.id,
                assignedId: priya.id,
                completedAt: new Date("2026-08-05"),
            },
            {
                title: "Build email templates",
                status: "Done",
                priority: "Medium",
                projectId: completedProject.id,
                assignedId: priya.id,
                completedAt: new Date("2026-08-10"),
            },
        ],
    });

    console.log("Seed complete — admin, 2 extra users, 4 projects, 12 tasks created.");
}