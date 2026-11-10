import { useAuthContext } from "../context/AuthContext"

export default function Home() {
    const { loggedInUser } = useAuthContext()

    return (
        <main className="flex-1 bg-slate-50 p-6 lg:p-8">
            <div className="mx-auto max-w-6xl">
                <header className="mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Welcome back, {loggedInUser?.firstName ?? "there"}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Here's what's happening across your projects.
                    </p>
                </header>

                <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-400">
                        test
                    </div>
                </section>

                <section className="mb-8">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-slate-900">Your projects</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-400">
                            Project goes here
                        </div>
                    </div>
                </section>

                <section>
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-slate-900">Tasks</h2>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-400">
                            task
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}