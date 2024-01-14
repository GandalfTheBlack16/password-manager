import { FiUser, FiKey, FiMail } from "react-icons/fi"
import { useLogin } from "../../hooks/useLogin"
import { Link } from "react-router-dom"
import './Login.css'

type LoginProps = {
    signUp?: boolean
}

export default function Login({ signUp = false }: LoginProps) {

    const {
        username,
        email,
        password,
        confirmPassword,
        invalidUser,
        invalidEmail,
        invalidPassword,
        invalidConfirmPassword,
        onUsernameChange,
        onEmailChange,
        onPasswordChange,
        onConfirmPasswordChange,
        handleLogin,
        handleSignup
    } = useLogin()

    return (
        <form className="login_form" aria-label="User login" onSubmit={(e) => {
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
                    className='icon'
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
                        className='icon'
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className={invalidEmail ? 'invalid' : ''}
                        value={email}
                        onChange={onEmailChange}
                    />
                </label>
            }
            <label>
                <FiKey
                    className='icon'
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
                        className='icon'
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className={invalidConfirmPassword ? 'invalid' : ''}
                        value={confirmPassword}
                        onChange={onConfirmPasswordChange}
                    />
                </label>
            }
            {
                !signUp && <Link to='/restore-password'>Forgot your password?</Link>
            }
            <button
                disabled={invalidUser || invalidPassword}
            >{signUp ? 'Create account' : 'Login'}</button>
        </form>
    )
}