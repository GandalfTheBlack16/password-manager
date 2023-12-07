import { FormEvent, SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router"
import { sendRecoveryEmail } from "../../services/RestorePasswordService"

export function RestorePasswordForm () {

    const [email, setEmail] = useState<string>('')
    const [summary, setSummary] = useState<string>('')

    const navigate = useNavigate()

    const handleEmailChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        sendRecoveryEmail(email).then(({ message }) => {
            setSummary(message)
        })
    }

    const handleReset = () => {
        navigate('/login')
    }
    
    return (
        !summary ? <form onReset={handleReset} onSubmit={handleSubmit} className="restore-form">
            <div className="restore-header">
                <h2>Password account recovery</h2>
                <p>Enter your address and if you are registered we will send you an email:</p>
            </div>
            <label>
                Email address
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </label>
            <div className="restore-actions">
                <button type="reset" style={{ backgroundColor: '#2f455b' }}>Back</button>
                <button type="submit">Send email</button>
            </div>
        </form> : 
        <>
            <p>{summary}</p>
            <button onClick={handleReset} style={{ margin: 'auto' }}>Accept</button>
        </>
    )
}