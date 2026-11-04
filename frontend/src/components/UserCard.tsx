import type { User } from "../types/User"

interface Props {
    user: User
}

export default function UserCard({ user }: Props) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-medium text-slate-400">#{user.id}</p>
                <p className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium capitalize text-indigo-700">
                    {user.role}
                </p>
            </div>

            <div className="mb-4 flex items-baseline gap-1.5">
                <p className="text-lg font-semibold text-slate-900">{user.firstName}</p>
                <p className="text-lg font-semibold text-slate-900">{user.lastName}</p>
            </div>

            <p className="text-sm text-slate-500">@{user.username}</p>
            <p className="truncate text-sm text-slate-600">{user.email}</p>

            <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
                Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
        </div>
    )
}