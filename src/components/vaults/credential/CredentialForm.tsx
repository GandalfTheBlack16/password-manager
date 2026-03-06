import { useLocation } from "react-router"
import { FiEye, FiEyeOff, FiShuffle } from 'react-icons/fi'
import { useCredential } from "../../../hooks/useCredential"
import './CredentialForm.css'

export function CredentialForm() {

    const { state: { 
        vaultId,
        credential
    } } = useLocation()

   const {
    name,
        description,
        secret,
        showSecret,
        invalidName,
        handleNameChange,
        handleDescriptionChange,
        handleSecretChange,
        handleShowSecretChange,
        handleSubmit,
        handleReset,
        handleGeneratePassword
   } = useCredential(vaultId, credential)

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
                    onChange={handleNameChange}
                    style={ invalidName ? { borderColor: 'red' } : {}}
                    required
                    autoFocus
                />
            </label>
            <label>
                Description
                <input 
                    type="text" 
                    value={description} 
                    placeholder="Description"
                    onChange={handleDescriptionChange}
                />
            </label>
            <label>
                Password
                <div className="password_field">
                    <input
                        type={!showSecret ? "password": 'text'}
                        value={secret}
                        placeholder="Secret"
                        onChange={handleSecretChange}
                        required
                    />
                    <div className="password_actions">
                        <button 
                            className={showSecret ? "toogle tooltip": "tooltip"}
                            type="button"
                            onClick={handleShowSecretChange}
                        >
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