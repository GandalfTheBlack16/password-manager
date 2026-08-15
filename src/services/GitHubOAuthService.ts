const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID
const GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI
const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI

export interface GitHubOAuthResponse {
    accessToken: string
    userInfo: {
        id: string
        username: string
        email: string
    }
}

/**
 * Generates the GitHub authorization URL
 */
export const generateGitHubAuthUrl = (): string => {
    const params = new URLSearchParams({
        client_id: GITHUB_CLIENT_ID,
        redirect_uri: GITHUB_REDIRECT_URI,
        scope: 'user:email',
        allow_signup: 'true'
    })
    return `https://github.com/login/oauth/authorize?${params.toString()}`
}

/**
 * Exchanges GitHub authorization code for access token
 */
export const exchangeCodeForToken = async (code: string): Promise<GitHubOAuthResponse> => {
    const uri = BASE_URI + '/auth/github/callback'
    
    const response = await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    const data = await response.json() as GitHubOAuthResponse
    return data
}

/**
 * Initiates GitHub OAuth login flow
 */
export const startGitHubLogin = (): void => {
    const authUrl = generateGitHubAuthUrl()
    window.location.href = authUrl
}
