import { FormEvent, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { FiEye, FiEyeOff, FiShuffle } from 'react-icons/fi'

import './CredentialForm.css'
import { generatePassword } from "../../../services/VaultService"

export function CredentialForm() {

    const { state: { 
        vaultId,
        credential
    } } = useLocation()

    const navigate = useNavigate()

    const [name, setName] = useState<string>(credential?.name)
    const [description, setDescription] = useState<string>(credential?.description)
    const [secret, setSecret] = useState<string>(credential?.secret)
    const [showSecret, setShowSecret] = useState<boolean>(false)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('submit')
    }

    const handleReset = () => {
        navigate('/vaults')
    }

    const handleGeneratePassword = () => {
        const password = generatePassword()
        setSecret(password)
    }

    return (
        <form
            className="credential_form"
            onSubmit={handleSubmit}
            onReset={handleReset}
        >
            <h2>{credential ? 'Edit credential details' : 'Create a new credential'}</h2>
            <label>
                Credential name
                <input 
                    type="text"
                    value={name} 
                    placeholder="Name"
                    onChange={(e) => { setName(e.target.value) }}
                    required
                />
            </label>
            <label>
                Description
                <input 
                    type="text" 
                    value={description} 
                    placeholder="Description"
                    onChange={(e) => { setDescription(e.target.value) }}
                />
            </label>
            <label>
                Password
                <div className="password_field">
                    <input
                        type={!showSecret ? "password": 'text'}
                        value={secret}
                        placeholder="Secret"
                        onChange={(e) => { setSecret(e.target.value) }}
                        required
                    />
                    <div className="password_actions">
                        <button className={showSecret ? "toogle tooltip": "tooltip"} type="button" onClick={() => { setShowSecret(curr => !curr) }}>
                            {!showSecret ? <FiEye size={'15px'}/> : <FiEyeOff size={'15px'}/>}
                            <span className="tooltip_text">{!showSecret ? 'Show password': 'Hide password'}</span>
                        </button>
                        <button className="tooltip" type="button" onClick={handleGeneratePassword}>
                            <FiShuffle size={'15px'}/>
                            <span className="tooltip_text">Generate password</span>
                        </button>
                    </div>
                </div>
            </label>
            <div className="form_actions">
                <button type="reset">Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>
    )
} 