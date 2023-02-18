import { createContext, useState } from 'react'

export const AuthContext = createContext({
    userAuthenticated: '',
    setUserAuthenticated: (user: string) => {},
    accessToken: '',
    setAccessToken: (token: string) => {}
})

export function AuthProvider ({ children }: { children: JSX.Element }) {

    const [userAuthenticated, setUserAuthenticated] = useState('');
    const [accessToken, setAccessToken] = useState('');

    return (
        <AuthContext.Provider value={{
            userAuthenticated,
            setUserAuthenticated,
            accessToken,
            setAccessToken
        }}
        >
            { children }
        </AuthContext.Provider>
    )
} 
