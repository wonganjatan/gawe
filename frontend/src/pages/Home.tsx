import { useAuthContext } from "../context/AuthContext"

export default function Home() {
    const { loggedInUser } = useAuthContext()

    return (
        <main className="flex-1 bg-slate-50 p-6 lg:p-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    Welcome back, {loggedInUser?.firstName ?? "there"}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Pick a project or task from the sidebar to get started.
                </p>
            </div>
        </main>
    )
}