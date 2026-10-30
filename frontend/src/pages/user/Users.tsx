import { useEffect, useState } from "react"
import type { User } from "../../types/User"
import { usersApi } from "../../api/users"

export default function Users() {
    const [users, setUsers] = useState<User[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await usersApi.getAllUsers()
                setUsers(data)
            } catch (error) {
                setError("Failed to load user")
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1 className="font-bold text-2xl p-4 shadow-md">Tasks</h1>

            {error && (
                <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    Error: {error}
                </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {users?.map(u => (
                    <div
                        key={u.id}
                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-xs font-medium text-slate-400">#{u.id}</p>
                            <p className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium capitalize text-indigo-700">
                                {u.role}
                            </p>
                        </div>

                        <div className="mb-4 flex items-baseline gap-1.5">
                            <p className="text-lg font-semibold text-slate-900">{u.firstName}</p>
                            <p className="text-lg font-semibold text-slate-900">{u.lastName}</p>
                        </div>

                        <p className="text-sm text-slate-500">@{u.username}</p>
                        <p className="truncate text-sm text-slate-600">{u.email}</p>

                        <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
                            Joined {new Date(u.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}