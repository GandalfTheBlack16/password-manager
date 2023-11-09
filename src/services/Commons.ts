import { useAuthStore } from "../hooks/stores/useAuthStore"

const TOKEN_EXPIRED_MESSAGE = 'Access token has expired'

export const buildHeaders = () => {
    const { accessToken } = useAuthStore.getState()
    if (!accessToken) {
        throw Error('Not authenticated')
    }
    const headers = new Headers()
    headers.set('Accept', 'application/json')
    headers.set('Authorization', `Bearer ${accessToken}`)
    return headers
}

export const checkTokenExpired = (statusCode: number, payload: { message: string }) => {
    const { logout } = useAuthStore.getState()
    if (statusCode === 401 && payload.message === TOKEN_EXPIRED_MESSAGE) {
        console.warn('Access token has expired. Performing logout...')
        logout()
    }
}