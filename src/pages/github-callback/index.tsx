import { useGitHubOAuth } from '../../hooks/useGitHubOAuth'

export default function GitHubCallback() {
    const { loading, error } = useGitHubOAuth()

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: '2rem',
            padding: '2rem'
        }}>
            {loading && (
                <>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid rgba(124, 156, 255, 0.2)',
                        borderTop: '4px solid var(--primary, #7c9cff)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <p>Authenticating with GitHub...</p>
                </>
            )}

            {error && (
                <>
                    <h2>Authentication Error</h2>
                    <p style={{ color: 'var(--danger, #f87171)' }}>{error}</p>
                    <a href="/login" style={{
                        padding: '0.8rem 2rem',
                        background: 'linear-gradient(135deg, #7c9cff 0%, #4f7cff 100%)',
                        color: '#f8fafc',
                        textDecoration: 'none',
                        borderRadius: '999px',
                        fontWeight: '600'
                    }}>
                        Back to Login
                    </a>
                </>
            )}

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}
