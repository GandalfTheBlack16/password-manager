import { create } from "zustand"

interface LoginState {
    isLogged: boolean
    accessToken: string
    userId: string
    username: string
    login: (token: string, id: string, username: string) => void
    logout: () => void
}

export const loginStore = create<LoginState>()((set) => ({
    isLogged: false,
    accessToken: '',
    userId: '',
    username: '',
    login: (token, id, username) => set(() => ({ isLogged: true, accessToken: token, userId: id, username })),
    logout: () => set(() => ({ isLogged: false, accessToken: '', userId: '', username: '' }))
}))