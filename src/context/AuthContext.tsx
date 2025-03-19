import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

type User = {
    id: string
    name: string
    role: 'careworker' | 'manager'
    picture?: string
}

type AuthContextType = {
    user: User | null
    isLoading: boolean  // Add the isLoading state
    login: (role: 'careworker' | 'manager') => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)  // Add state for loading

    useEffect(() => {
        // Simulate an API call to fetch user data
        setTimeout(() => {
            // For example purposes, we just set a dummy user
            setUser({
                id: '123',
                name: 'Care Worker',
                role: 'careworker'
            })
            setIsLoading(false)  // Set loading to false after fetching user data
        }, 2000)  // Simulate a 2-second delay
    }, [])

    const login = (role: 'careworker' | 'manager') => {
        setUser({
            id: '123',
            name: role === 'careworker' ? 'Care Worker' : 'Manager',
            role
        })
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
