export interface HeaderProps {
    isLogged: boolean
}

export interface LoginServiceProps {
    username: string
    password: string
}

export type UserInfo = {
    id: string
    email: string
    username: string
}

export interface LoginServiceData {
    status: string
    accessToken: string
    userInfo: UserInfo
}