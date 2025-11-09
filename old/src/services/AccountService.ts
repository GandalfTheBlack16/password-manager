import { UpdateAccountServiceData, UpdateAccountServiceProps, UpdatePasswordServiceProps } from "../types"
import { buildHeaders, checkTokenExpired } from "./Commons"

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI

export const checkUsernameAvailable = async (username: string) => {
    const uri = `${BASE_URI}/api/users/available?username=${username}`
    const headers = buildHeaders()

    const response = await fetch(uri, { headers })
    const data = await response.json()
    if (!response.ok) {
        checkTokenExpired(response.status, data)
        throw Error(response.statusText)
    }
    
    const { available }: { available: boolean } = data

    return available
}

export const checkEmailAvailable = async (email: string) => {
    const uri = `${BASE_URI}/api/users/available?email=${email}`
    const headers = buildHeaders()

    const response = await fetch(uri, { headers })
    const data = await response.json()
    if (!response.ok) {
        checkTokenExpired(response.status, data)
        throw Error(response.statusText)
    }
    
    const { available }: { available: boolean } = data

    return available
}

export const updateUserDetails = async ({ id, username, email }: UpdateAccountServiceProps) => {
    const uri = `${BASE_URI}/api/users/${id}`
    const headers = buildHeaders()
    headers.set('Content-Type', 'application/json')
    const payload = {
        user: {}
    }

    if (username) {
        payload.user = {...payload.user, username}
    }

    if (email) {
        payload.user = {...payload.user, email}
    }

    const response = await fetch(uri, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (!response.ok) {
        checkTokenExpired(response.status, data)
        throw Error(response.statusText)
    }
    return data.user as UpdateAccountServiceData
}

export const updatePassword = async ({ currPassword, newPassword }: UpdatePasswordServiceProps) => {
    const uri = `${BASE_URI}/api/users/password`
    const headers = buildHeaders()
    headers.set('Content-Type', 'application/json')
    const payload = {
        oldPassword: currPassword,
        newPassword
    }

    const response = await fetch(uri, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (!response.ok) {
        checkTokenExpired(response.status, data)
        throw Error(data.message)
    }

    return data.message as string
}