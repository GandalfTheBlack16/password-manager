import { RecoveryEmailResponse } from "../types"

const BASE_URI = import.meta.env.VITE_RESTORE_PWD_BASE_URI

export const sendRecoveryEmail = async (email: string): Promise<RecoveryEmailResponse> => {
    const uri = BASE_URI + '/restore-password'
    const payload = {
        email
    }
    const response = await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (!response.ok) {
        throw response.statusText
    }
    const data = await response.json() as RecoveryEmailResponse
    return data
}