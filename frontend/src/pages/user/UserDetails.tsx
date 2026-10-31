import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { usersApi } from "../../api/users"
import type { User } from "../../types/User"

export default function UserDetails() {
    const { id } = useParams()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchUserById = async (id: number) => {
            try {
                const data = await usersApi.getUserById(id)
                setUser(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchUserById(Number(id))
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    if (!user) {
        return <p>User not found</p>
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <h1 className="font-bold text-2xl pb-8 text-center">Your Details</h1>
                <div className="flex flex-col items-center justify-center pb-8">
                    <h2 className="font-bold text-lg">{user.firstName} {user.lastName}</h2>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700 mb-1">First Name:</p>
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm">
                                {user.firstName}
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700 mb-1">Last Name:</p>
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm">
                                {user.lastName}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-700 mb-1">Username:</p>
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm">
                            {user.username}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-700 mb-1">Email:</p>
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm">
                            {user.email}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col flex-1">
                            <p className="text-sm font-medium text-gray-700 mb-1">Role:</p>
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.role === "Admin" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-700"}`}>
                                    {user.role}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-sm font-medium text-gray-700 mb-1">Member since:</p>
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-6 flex flex-col items-center justify-between space-y-8">
                    <Link to="/" className="w-full flex justify-center border border-blue-500 rounded-xl hover:bg-gray-200 px-2 py-1 transition-colors duration-300">Back to Home</Link>
                </div>
            </div>
        </main>
    )
}