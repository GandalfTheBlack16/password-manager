import { FormEvent, SyntheticEvent, useState } from "react"
import { loginRequest } from "../services/LoginService"
import { useAuthStore } from "./stores/useAuthStore"
import { useNavigate } from "react-router"
import { signupRequest } from "../services/SignupService"

export function useLogin() {

    const navigate = useNavigate()
    const { login } = useAuthStore()

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false)
    const [invalidUser, setInvalidUser] = useState<boolean>(false)
    const [invalidEmail, setInvalidEmail] = useState<boolean>(false)
    const [invalidPassword, setInvalidPassword] = useState<boolean>(false)
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false)

    const closeDialog = () => {
        setShowErrorDialog(false)
    }

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

    const onKeepLoggedInChange = () => {
        setKeepLoggedIn((value) => !value)
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
        if (!validUsername()) {
            setError('Username should have 4 characters at least or to be a valid email address')
            setShowErrorDialog(true)
            return
        }
        if (!validPassword()) {
            setError('Password should have 6 characters at least')
            setShowErrorDialog(true)
            return
        }
        loginRequest({ username, password, keepLoggedIn })
            .then((data) => {
                const { accessToken, userInfo } = data
                login(accessToken, userInfo.id, userInfo.username, userInfo.email)
                navigate('/vaults')
            })
            .catch(err => {
                if (err === 'Unauthorized') {
                    setError('Invalid username/email address or password')
                    setShowErrorDialog(true)
                }
                else {
                    setError(`Unexpected error on login request: ${err.message}`)
                    setShowErrorDialog(true)
                } 
            })
            .finally(() => {
                setPassword('')
            })
    }

    const handleSignup = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        if (!validUsername()) {  
            setError('Username should be 4 character length at least')
            setShowErrorDialog(true)
           return
        }
        if (!validEmail(email)) {
            setError('Email should be a valid email address')
            setShowErrorDialog(true)
            return
        }
        if (!validPassword()) {
            setError('Password should be 6 character length at least')
            setShowErrorDialog(true)
            return
        }
        if(!validConfirmPassword()) {
            setError('Passwords don\'t match')
            setShowErrorDialog(true)
            return
        }
        signupRequest({ username, email, password })
            .then(data => {
                if (data.status === 'Success') {
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
        keepLoggedIn,
        invalidUser,
        invalidEmail,
        invalidPassword,
        invalidConfirmPassword,
        error,
        showErrorDialog,
        onUsernameChange,
        onEmailChange,
        onPasswordChange,
        onConfirmPasswordChange,
        onKeepLoggedInChange,
        handleLogin,
        handleSignup,
        closeDialog
    }
}