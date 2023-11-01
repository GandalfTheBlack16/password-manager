import { FormEvent, SyntheticEvent, useState } from "react"
import { loginRequest } from "../services/LoginService"
import { loginStore } from "../stores/loginStore"
import { useNavigate } from "react-router"

export function useLogin() {

    const navigate = useNavigate()
    const { login } = loginStore()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [invalidUser, setInvalidUser] = useState<boolean>(false)
    const [invalidPassword, setInvalidPassword] = useState<boolean>(false)

    const onUsernameChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value)
    }

    const onPasswordChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }

    const onUsernameBlur = () => {
        if (username.length === 0) {
            setInvalidUser(false)
            return
        }
        const invlidEmail = username.includes('@') && !/^\S+@\S+\.\S+$/.test(username)
        setInvalidUser(username.length < 4 || invlidEmail)
    }

    const onPasswordBlur = () => {
        if (password.length === 0) {
            setInvalidPassword(false)
            return
        }
        setInvalidPassword(password.length < 6)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (invalidUser || invalidPassword) {
            return
        }
        loginRequest({ username, password })
            .then((data) => {
                const { accessToken, userInfo } = data
                login(accessToken, userInfo.id, userInfo.username)
                setUsername('')
                setPassword('')
                navigate('/vaults')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return {
        username,
        password,
        invalidUser,
        invalidPassword,
        onUsernameChange,
        onUsernameBlur,
        onPasswordChange,
        onPasswordBlur,
        handleSubmit
    }
}