import { FormEvent } from "react"
import { FiLock, FiUser } from "react-icons/fi"
import './Login.css'

export function Login () {
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }
    
    return (
        <main>
            <form aria-label="User login" onSubmit={handleSubmit}>
                <label>
                    <FiUser className='form_icon' />
                    <input 
                        type="text"
                        name="username"
                        placeholder="Username/email"
                    />
                </label>
                <label>
                    <FiLock className='form_icon' />
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                </label>
                <button>Login</button>
            </form>
        </main>
    )
}