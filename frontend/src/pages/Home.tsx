import { useEffect } from "react"
import { useAuthContext } from "../context/AuthContext"

export default function Home() {
    const { loggedInUser } = useAuthContext()

    return (
        <main className="flex-1 p-5 bg-white shadow-md">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-2xl font-bold">
                        Welcome back, {loggedInUser?.firstName ?? "there"}
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Here's what's happening across your projects.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-6">
                test
            </div>

            <p className="text-sm font-medium mb-2">Your projects</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
                Project goes here
            </div>

            <p className="text-sm font-medium mb-2">Tasks</p>
            <div className="flex flex-col gap-1.5">
               task
            </div>
        </main>
    )
}