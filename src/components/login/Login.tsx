import { FiUser, FiKey, FiMail } from "react-icons/fi"
import './Login.css'
import { useLogin } from "../../hooks/useLogin"
import { Link } from "react-router-dom"

type LoginProps = {
    signUp?: boolean
}

export default function Login({ signUp = false }: LoginProps) {

    const {
        username,
        password,
        invalidUser,
        invalidPassword,
        invalidCredentials,
        onUsernameChange,
        onPasswordChange,
        handleLogin,
        handleSignup
    } = useLogin()

    return (
        <form aria-label="User login" onSubmit={(e) => {
            if (!signUp){
                handleLogin(e)
            } else {
                handleSignup(e)
            }
        }}>
            <div className="form_header">
                <h2>{!signUp ? 'Login with your account' : 'Create a new account'}</h2>
                <Link to={!signUp ? '/signup' : '/login'}>
                    {
                        !signUp ? 'If you don\'t have one, signup for free' :
                            'Have you been already registered?'
                    }
                </Link>
            </div>
            <label>
                <FiUser
                    size="25px"
                />
                <input
                    type="text"
                    name="username"
                    placeholder={!signUp ? "Username/email" : "Username"}
                    className={invalidUser ? 'invalid' : ''}
                    value={username}
                    onChange={onUsernameChange}
                />
            </label>
            {
                signUp &&
                <label>
                    <FiMail
                        size="25px"
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className={invalidUser ? 'invalid' : ''}
                    />
                </label>
            }
            <label>
                <FiKey
                    size="25px"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={invalidPassword ? 'invalid' : ''}
                    value={password}
                    onChange={onPasswordChange}
                />
            </label>
            {
                signUp &&
                <label>
                    <FiKey
                        size="25px"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className={invalidPassword ? 'invalid' : ''}
                    />
                </label>
            }
            <div className="validation_error">
                {invalidUser && <span>Username should have at least 4 characters and email should be a valid address</span>}
                {invalidPassword && <span>Password should have at least 6 characters</span>}
                {invalidCredentials && <span>Username does not exists or password is incorrect</span>}
            </div>
            <button
                disabled={invalidUser || invalidPassword}
            >{signUp ? 'Create account' : 'Login'}</button>
        </form>
    )
}