import { FormEvent, SyntheticEvent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { restorePassword, sendRecoveryEmail } from "../../services/RestorePasswordService";
import { Form } from "../../components/form/Form";

type RestorePasswordProps = {
    token: string
}

export function RestorePasswordPage () {
    const { token } = useParams()
    return (
        token ? <RestorePasswordFragment token={token} /> :
        <SendEmailFragment />
    )
}

function SendEmailFragment () {

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

    return(
        !summary ?
        <>
            <h2>Password account recovery</h2>
            <p>Enter your address and if you are registered we will send you an email</p>
            <Form onReset={handleReset} onSubmit={handleSubmit}>
                <label>
                    Email address
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </label>
                <div className="form_actions">
                    <button type="reset">Back</button>
                    <button type="submit">Send email</button>
                </div>
            </Form> 
        </>
        : 
        <>
            <p>{summary}</p>
            <button onClick={handleReset} style={{ margin: 'auto' }}>Accept</button>
        </>
    )
}

function RestorePasswordFragment ({ token }: RestorePasswordProps) {

    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return
        }
        restorePassword(password, token)
        .then(() => {
            navigate('/login')
        })
        .catch((e) => {
            console.error(e)
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Restore password</h1>
            <label>
                New password
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: SyntheticEvent<HTMLInputElement>) => { setPassword(e.currentTarget.value) }}
                />
            </label>
            <label>
                Confirm password
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e: SyntheticEvent<HTMLInputElement>) => { setConfirmPassword(e.currentTarget.value) }}
                />
            </label>
            <button>Restore password    </button>
        </Form>
    )
}