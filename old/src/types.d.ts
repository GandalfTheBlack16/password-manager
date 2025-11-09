export interface LoginServiceProps {
    username: string
    password: string
    keepLoggedIn: boolean
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

export interface Vault {
    credentials:  Credential[];
    id:           string;
    lastModified: Date;
    owner:        string;
   }
   
export interface Credential {
    description: string;
    id?:          string;
    name:        string;
    secret:      string;
}

export interface UpdateAccountServiceProps {
    id: string
    username?: string
    email?: string
}

export interface UpdateAccountServiceData {
    username: string
    email: string
}

export interface UpdatePasswordServiceProps {
    currPassword: string
    newPassword: string
}

export interface RecoveryEmailResponse {
    message: string;
    status:  string;
}