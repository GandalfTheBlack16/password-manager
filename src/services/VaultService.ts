import { useAuthStore } from "../hooks/stores/useAuthStore"
import { Vault, Credential } from "../types"

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI
const TOKEN_EXPIRED_MESSAGE = 'Access token has expired'

const buildHeaders = () => {
    const { accessToken } = useAuthStore.getState()
    if (!accessToken) {
        throw Error('Not authenticated')
    }
    const headers = new Headers()
    headers.set('Accept', 'application/json')
    headers.set('Authorization', `Bearer ${accessToken}`)
    return headers
}

const checkTokenExpired = (statusCode: number, payload: { message: string }) => {
    const { logout } = useAuthStore.getState()
    if (statusCode === 401 && payload.message === TOKEN_EXPIRED_MESSAGE) {
        console.warn('Access token has expired. Performing logout...')
        logout()
    }
}

export const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 16; i++) {
        const ramdomChar = chars.charAt(Math.floor(Math.random() * chars.length));
        password += ramdomChar;
    }
    
    return password;
}

export const fetchVaults = async () => {
    const headers = buildHeaders()
    const response = await fetch(`${BASE_URI}/api/vaults`, { headers })
    const data = await response.json()
    if (!response.ok) {
        checkTokenExpired(response.status, data)
        throw Error(response.statusText)
    }
    
    return data.vaults as Vault[]
}

export const createVault = async () => {
    const headers = buildHeaders()
    const response = await fetch(`${BASE_URI}/api/vaults`, {
        method: 'PUT',
        headers
    })
    const data = await response.json()
    if (!response.ok) {
        checkTokenExpired(response.status, data)
        throw Error(response.statusText)
    }
    return data.vault as Vault
}

export const deleteVault =async (vaultId: string) => {
    const headers = buildHeaders()
    const response = await fetch(`${BASE_URI}/api/vaults/${vaultId}`, {
        method: 'DELETE',
        headers
    })
    const data = await response.json()
    if (!response.ok) {
        checkTokenExpired(response.status, data)
        throw Error(response.statusText)
    }
    return data
}

export const updateCredentials = async (vaultId: string, credentials: Credential[]) => {
    const headers = buildHeaders()
    headers.set('Content-Type', 'application/json')
    const payload = { credentials }
    const response = await fetch(`${BASE_URI}/api/vaults/${vaultId}/credentials`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (!response.ok) {
        checkTokenExpired(response.status, data)
        throw Error(response.statusText)
    }
    return data.vault as Vault
}

export const deleteCredential = async (vaultId: string, credentialId: string) => {
    const headers = buildHeaders()
    const response = await fetch(`${BASE_URI}/api/vaults/${vaultId}/credentials/${credentialId}`, {
        method: 'DELETE',
        headers
    })
    const data = await response.json()
    if (!response.ok) {
        checkTokenExpired(response.status, data)
        throw Error(response.statusText)
    }
    return data.vault as Vault
}
