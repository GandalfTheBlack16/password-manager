import { FormEvent, SyntheticEvent, useState } from "react"
import { loginRequest } from "../services/LoginService"
import { useAuthStore } from "./useAuthStore"
import { useNavigate } from "react-router"
import { signupRequest } from "../services/SignupService"

export function useLogin() {

    const navigate = useNavigate()
    const { login } = useAuthStore()

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [signupResult, setSignupResult] = useState<string>('')
    const [invalidUser, setInvalidUser] = useState<boolean>(false)
    const [invalidEmail, setInvalidEmail] = useState<boolean>(false)
    const [invalidPassword, setInvalidPassword] = useState<boolean>(false)
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState<boolean>(false)
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

    const onEmailChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
        setInvalidEmail(curr => {
            if (curr && validEmail(email)) {
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

    const onConfirmPasswordChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setConfirmPassword(event.currentTarget.value)
        setInvalidConfirmPassword(curr => {
            if (curr && validConfirmPassword()) {
                return false
            }
            return curr
        })
    }

    const validEmail = (email: string) => {
        if(!/^\S+@\S+\.\S+$/.test(email)) {
            setInvalidEmail(true)
            return false
        }
        return true
    }

    const validUsername = () => {
        const invalidEmail = username.includes('@') && !validEmail(username)
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

    const validConfirmPassword = () => {
        if (password.trim() !== confirmPassword.trim()) {
            setInvalidConfirmPassword(true)
            return false
        }
        return true
    }

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
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

    const handleSignup = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        if (!validUsername() || !validEmail(email) || !validPassword() || !validConfirmPassword()) {  
           return
        }
        signupRequest({ username, email, password })
            .then(data => {
                if (data.status === 'Success') {
                    setSignupResult(data.message)
                    setEmail('')
                    setPassword('')
                    setConfirmPassword('')
                    navigate('/login')
                }
            })
    }

    return {
        username,
        email,
        password,
        confirmPassword,
        signupResult,
        invalidUser,
        invalidEmail,
        invalidPassword,
        invalidConfirmPassword,
        invalidCredentials,
        onUsernameChange,
        onEmailChange,
        onPasswordChange,
        onConfirmPasswordChange,
        handleLogin,
        handleSignup
    }
}