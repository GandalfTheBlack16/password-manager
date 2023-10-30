import { FormEvent, SyntheticEvent, useState } from "react"
import { FiUser, FiKey } from "react-icons/fi"
import './Login.css'
import { loginRequest } from "../../services/LoginService"

export function Login () {
    
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
                console.log(data)
                setUsername('')
                setPassword('')
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    return (
        <form aria-label="User login" onSubmit={handleSubmit}>
            <div className="form_header">
                <h2>Login with your account</h2>
                <a href="/signup">If you don't have one, signup for free</a>
            </div>
            <label>
                <FiUser  
                    size="25px"
                />
                <input 
                    type="text"
                    name="username"
                    placeholder="Username/email"
                    className={invalidUser ? 'invalid': ''}
                    value={username}
                    onChange={onUsernameChange}
                    onBlur={onUsernameBlur}
                />
            </label>
            <label>
                <FiKey
                    size="25px"
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={invalidPassword ? 'invalid': ''}
                    value={password}
                    onChange={onPasswordChange}
                    onBlur={onPasswordBlur}
                />
            </label>
            <div className="validation_error">
                { invalidUser && <span>Username should have at least 4 characters and email should be a valid address</span> }
                { invalidPassword && <span>Password should have at least 6 characters</span> }
            </div>
            <button
                disabled={invalidUser || invalidPassword}
            >Login</button>
        </form>   
    )
}