import { useAuthStore } from "../hooks/useAuthStore"
import { Vault } from "../types"

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI
const TOKEN_EXPIRED_MESSAGE = 'Access token has expired'

export const fetchVaults = async () => {
    
    const { accessToken, logout } = useAuthStore.getState()

    if (!accessToken) {
        throw Error('Not authenticated')
    }

    const headers = new Headers()
    headers.set('Accept', 'application/json')
    headers.set('Authorization', `Bearer ${accessToken}`)

    const response = await fetch(`${BASE_URI}/api/vaults`, { headers })
    const data = await response.json()
    if (!response.ok) {
        if (checkTokenExpired(response.status, data)) {
            console.warn('Access token has expired. Performing logout...')
            logout()
        }
        throw Error(response.statusText)
    }

    return data.vaults as Vault[]
}

const checkTokenExpired = (statusCode: number, payload: { message: string }) => statusCode === 401 && payload.message === TOKEN_EXPIRED_MESSAGE

export const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 16; i++) {
        const ramdomChar = chars.charAt(Math.floor(Math.random() * chars.length));
        password += ramdomChar;
    }

    return password;
}