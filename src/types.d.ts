export interface LoginServiceProps {
    username: string
    password: string
}

export interface SignupServiceProps {
    username: string
    email: string
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

export interface SignupServiceData {
    message: string
    status: string
}