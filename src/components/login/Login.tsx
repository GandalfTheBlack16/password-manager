import { FiUser, FiKey } from "react-icons/fi"
import './Login.css'
import { useLogin } from "../../hooks/useLogin"
import { loginStore } from "../../stores/loginStore"
import { Navigate } from "react-router-dom"

export function Login () {
    
    const isLogged = loginStore(state => state.isLogged)

    const {
        username,
        password,
        invalidUser,
        invalidPassword,
        onUsernameChange,
        onUsernameBlur,
        onPasswordChange,
        onPasswordBlur,
        handleSubmit
    } = useLogin()
    
    return (
        isLogged ? <Navigate to={"/"} /> :
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