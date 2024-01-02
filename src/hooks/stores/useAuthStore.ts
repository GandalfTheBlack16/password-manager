import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface AuthState {
    isLogged: boolean
    accessToken: string
    userId: string
    username: string
    email: string
    login: (token: string, id: string, username: string, email: string) => void
    logout: () => void
    updateDetails: (username: string, email: string) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLogged: false,
            accessToken: '',
            userId: '',
            username: '',
            email: '',
            login: (token, id, username, email) => set(() => ({ isLogged: true, accessToken: token, userId: id, username, email })),
            logout: () => set(() => ({ isLogged: false, accessToken: '', userId: '', username: '', email: '' })),
            updateDetails: (username, email) => set(() => ({ username, email }))
        }),
        { name: 'auth-store', storage: createJSONStorage(() => localStorage) }
    )
)