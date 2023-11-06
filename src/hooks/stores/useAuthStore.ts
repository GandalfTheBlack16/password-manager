import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface AuthState {
    isLogged: boolean
    accessToken: string
    userId: string
    username: string
    login: (token: string, id: string, username: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLogged: false,
            accessToken: '',
            userId: '',
            username: '',
            login: (token, id, username) => set(() => ({ isLogged: true, accessToken: token, userId: id, username })),
            logout: () => set(() => ({ isLogged: false, accessToken: '', userId: '', username: '' }))
        }),
        { name: 'auth-store', storage: createJSONStorage(() => sessionStorage) }
    )
)