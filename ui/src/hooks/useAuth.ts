import { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { login as loginService } from "../services/AuthService";

export default function useAuth() {

    const { setUserAuthenticated, setAccessToken } = useContext(AuthContext);
    const [ error, setError ] = useState('');

    const resetError = () => {
        setError('')
    }

    const login = async (
        { username, password }: {username: string, password: string}
    ) => {
        try {
            const { status, username: _username, access_token } = await loginService({ username, password });
            if (status !== 'success'){
                setError('Invalid username/password. Try it again')
                return;
            }    
            setUserAuthenticated(_username);
            setAccessToken(access_token);
        } catch (error) {
            setError(JSON.stringify(error))
        }
    }

    const signup =async (
        { username, password }: {username: string, password: string}
    ) => {
        
    }

    return { login, error, resetError }
}