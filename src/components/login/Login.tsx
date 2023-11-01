import { FiUser, FiKey } from "react-icons/fi"
import './Login.css'
import { useLogin } from "../../hooks/useLogin"

export default function Login () {

    const {
        username,
        password,
        invalidUser,
        invalidPassword,
        invalidCredentials,
        onUsernameChange,
        onPasswordChange,
        handleSubmit
    } = useLogin()
    
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
                />
            </label>
            <div className="validation_error">
                { invalidUser && <span>Username should have at least 4 characters and email should be a valid address</span> }
                { invalidPassword && <span>Password should have at least 6 characters</span> }
                { invalidCredentials && <span>Username does not exists or password is incorrect</span> }
            </div>
            <button
                disabled={invalidUser || invalidPassword}
            >Login</button>
        </form>   
    )
}