import { useEffect, useState } from "react"
import type { User } from "../../types/User"
import { usersApi } from "../../api/users"
import UserCard from "../../components/UserCard"

export default function Users() {
    const [users, setUsers] = useState<User[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await usersApi.getAllUsers()
                setUsers(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    if (!users) {
        return <p>Users not found</p>
    }

    return (
        <div>
            <h1 className="font-bold text-2xl p-4 shadow-md">Users</h1>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {users?.map(user => (
                    <UserCard key={user.id} user={user}/>
                ))}
            </div>
        </div>
    )
}