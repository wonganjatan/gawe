import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { usersApi } from "../api/users";

export default function Landing() {
    const [users, setUsers] = useState<User[] | null>(null)

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const data = await usersApi.getAllUsers()
                setUsers(data)
            } catch (error) {
                console.error(error)
            }
        }

        getAllUsers()
    }, [])

    return (
        <div>
            <h1>Gawe</h1>
            {users && (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name} - {user.email}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}