import { SignupServiceData, SignupServiceProps } from "../types";

const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI

export const signupRequest = async ({ email, username, password }: SignupServiceProps): Promise<SignupServiceData> => {
    const uri = BASE_URI + '/signup'
    const payload = {
        email,
        username,
        password
    }
  
    const response = await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (!response.ok) {
        throw response.statusText
    }
    const data = await response.json() as SignupServiceData
    return data
}