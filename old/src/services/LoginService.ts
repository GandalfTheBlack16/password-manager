import { LoginServiceData, LoginServiceProps } from '../types';

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI

const logginWithEmail = (value: string) => {
    return /^\S+@\S+\.\S+$/.test(value)
}

const loginRequest = async ({ username, password, keepLoggedIn }: LoginServiceProps): Promise<LoginServiceData> => {
    const uri = BASE_URI + '/login'
    const payload = {
        ...(logginWithEmail(username) ? { email: username }: { username }),
        password,
        keepLoggedIn
    }
  
    const response = await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (!response.ok) {
        throw response.statusText
    }
    const data = await response.json() as LoginServiceData
    return data
}

export { loginRequest }