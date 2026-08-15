import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { exchangeCodeForToken } from '../services/GitHubOAuthService'
import { useAuthStore } from './stores/useAuthStore'
import { useToast } from './useToast'

export interface UseGitHubOAuthReturn {
    loading: boolean
    error: string | null
    code: string | null
}

/**
 * Hook to handle GitHub OAuth callback
 * Should be used in a callback page component
 */
export function useGitHubOAuth(): UseGitHubOAuthReturn {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { login } = useAuthStore()
    const { setError, setSuccess } = useToast()

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setErrorState] = useState<string | null>(null)
    const code = searchParams.get('code')
    const errorParam = searchParams.get('error')

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Handle GitHub error response
                if (errorParam) {
                    const errorDescription = searchParams.get('error_description') || 'Authentication cancelled'
                    setErrorState(errorDescription)
                    setError(errorDescription)
                    setLoading(false)
                    return
                }

                // Validate code exists
                if (!code) {
                    setErrorState('No authorization code received')
                    setError('No authorization code received')
                    setLoading(false)
                    return
                }

                // Exchange code for token
                const data = await exchangeCodeForToken(code)
                const { accessToken, userInfo } = data

                // Store auth details
                login(accessToken, userInfo.id, userInfo.username, userInfo.email)
                setSuccess('Successfully logged in with GitHub!')

                // Redirect to vaults
                navigate('/vaults')
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to authenticate with GitHub'
                setErrorState(errorMessage)
                setError(errorMessage)
                setLoading(false)
            }
        }

        handleCallback()
    }, [code, errorParam, searchParams, login, navigate, setError, setSuccess])

    return { loading, error, code }
}
