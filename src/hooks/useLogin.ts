import { FormEvent, SyntheticEvent, useState } from "react"
import { loginRequest } from "../services/LoginService"
import { useAuthStore } from "./useAuthStore"
import { useNavigate } from "react-router"

export function useLogin() {

    const navigate = useNavigate()
    const { login } = useAuthStore()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [invalidUser, setInvalidUser] = useState<boolean>(false)
    const [invalidPassword, setInvalidPassword] = useState<boolean>(false)
    const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false)

    const onUsernameChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value)
        setInvalidUser(curr => {
            if (curr && validUsername()) {
                return false
            }
            return curr
        })
    }
    
    const onPasswordChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
        setInvalidPassword(curr => {
            if (curr && validPassword()) {
                return false
            }
            return curr
        })
    }
    
    const validUsername = () => {
        const invalidEmail = username.includes('@') && !/^\S+@\S+\.\S+$/.test(username)
        if (username.length < 4 || invalidEmail) {
            setInvalidUser(true)
            return false 
        }
        return true
    }
    
    const validPassword = () => {
        if (password.length < 6) {
            setInvalidPassword(true)
            return false
        }
        return true
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setInvalidCredentials(false)
        if (!validUsername() || !validPassword()) {
            return
        }
        loginRequest({ username, password })
            .then((data) => {
                const { accessToken, userInfo } = data
                login(accessToken, userInfo.id, userInfo.username)
                navigate('/vaults')
            })
            .catch(err => {
                if (err === 'Unauthorized') {
                    setInvalidCredentials(true)
                }
            })
            .finally(() => {
                setPassword('')
            })
    }

    return {
        username,
        password,
        invalidUser,
        invalidPassword,
        invalidCredentials,
        onUsernameChange,
        onPasswordChange,
        handleSubmit
    }
}