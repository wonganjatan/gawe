import React, { createContext, useContext, useState } from "react";
import type { CreateUserInput, User } from "../types/User";
import { authApi } from "../api/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    loggedInUser: User | null
    signUp: (input: CreateUserInput) => Promise<void>
    signIn: (email: string, password: string) => Promise<User>
    signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
    const navigate = useNavigate()

    async function signUp(input: CreateUserInput): Promise<void> {
        await authApi.register(input)
    }

    async function signIn(email: string, password: string): Promise<User> {
        const user =  await authApi.login(email, password)
        setLoggedInUser(user)
        return user
    }

    function signOut(): void {
        setLoggedInUser(null)
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{
            loggedInUser,
            signUp,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider")
    }

    return context
}