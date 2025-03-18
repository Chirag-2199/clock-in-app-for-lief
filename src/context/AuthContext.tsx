import { createContext, useContext, ReactNode, useState } from 'react'

type User = {
    id: string
    name: string
    role: 'careworker' | 'manager'
}

type AuthContextType = {
    user: User | null
    login: (role: 'careworker' | 'manager') => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    const login = (role: 'careworker' | 'manager') => {
        setUser({
            id: '123',
            name: role === 'careworker' ? 'Care Worker' : 'Manager',
            role
        })
    }

    const logout = () => setUser(null)

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)