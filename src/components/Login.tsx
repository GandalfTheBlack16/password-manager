import { FormEvent } from "react"
import { FiUser, FiKey } from "react-icons/fi"
import './Login.css'

export function Login () {
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }
    
    return (
        <form aria-label="User login" onSubmit={handleSubmit}>
            <h2>Login with your account</h2>
            <label>
                <FiUser  
                    size="25px"
                />
                <input 
                    type="text"
                    name="username"
                    placeholder="Username/email"
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
                />
            </label>
            <button>Login</button>
        </form>   
    )
}