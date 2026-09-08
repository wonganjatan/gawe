import { useEffect, useState } from "react"
import type { User } from "../../types/User"
import { usersApi } from "../../api/users"

export default function Users() {
    const [users, setUsers] = useState<User[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await usersApi.getAllUsers()
                setUsers(data)
            } catch (error) {
                setError("Failed to load user")
            }
        }

        fetchUsers()
    }, [])
    return (
        <div>
            <h1>Users</h1>
            {error && (<p>Error: {error}</p>)}
            <div>
                {users?.map(u => (
                    <div>
                        <p>{u.id}</p>
                        <p>{u.firstName}</p>
                        <p>{u.lastName}</p>
                        <p>{u.username}</p>
                        <p>{u.email}</p>
                        <p>{u.role}</p>
                        <p>{u.createdAt.toISOString()}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}