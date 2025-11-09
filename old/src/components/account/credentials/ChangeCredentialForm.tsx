import { SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router"
import { FiEye, FiEyeOff } from 'react-icons/fi'
import '../Account.css'
import { updatePassword } from "../../../services/AccountService"
import { useToast } from "../../../hooks/useToast"

export function ChangeCredentialForm () {
    
    const navigate = useNavigate()

    const [currPassword, setCurrPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [currPwdVisible, setCurrPwdVisible] = useState<boolean>(false)
    const [newPwdVisible, setNewPwdVisible] = useState<boolean>(false)
    const [confirmPwdVisible, setConfirmPwdVisible] = useState<boolean>(false)

    const [invalidOldPwd, setInvalidOldPwd] = useState<boolean>(false)
    const [pwdNotMatch, setPwdNotMatch] = useState<boolean>(false)

    const { setSuccess, setError } = useToast()

    const handleCurrPasswordChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setCurrPassword(event.currentTarget.value)
        setInvalidOldPwd(false)
    }

    const handleNewPasswordChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setNewPassword(event.currentTarget.value)
        setPwdNotMatch(false)
    }

    const handleConfirmPasswordChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setConfirmPassword(event.currentTarget.value)
        setPwdNotMatch(false)
    }

    const handleReset = () => {
        navigate('/account')
    }

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (newPassword !== confirmPassword) {
            setPwdNotMatch(true)
            setError('Input passwords don\'t match')
            return
        }
        updatePassword({ currPassword, newPassword })
            .then(message => {
                setSuccess(message)
                navigate('/logout')
            })
            .catch((err: Error) => {
                setError(err.message)
                if (err.message.includes('Current password does not match')){
                    setInvalidOldPwd(true)
                }
            })
    }

    
    return (
        <>
            <h2>Update your password</h2>
            <form onReset={handleReset} onSubmit={handleSubmit} className="account_form">
                <div className="inputs">
                    <label>
                        Current password
                        <div className="input_group">
                            <input 
                                type={!currPwdVisible ? 'password' : 'text'} 
                                value={currPassword}
                                onChange={handleCurrPasswordChange}
                                className={invalidOldPwd ? 'invalid' : ''}
                                autoFocus
                            />
                            <button 
                                type="button"
                                className="icon_button tooltip"
                                tabIndex={-1}
                                onClick={() => { setCurrPwdVisible(curr => !curr) }}
                            >
                                {!currPwdVisible ? <FiEye /> : <FiEyeOff />}
                                <span className="tooltip_text">{!currPwdVisible ? 'Show password' : 'Hide password'}</span>
                            </button>
                        </div>
                    </label>
                    <label>
                        New password
                        <div className="input_group">
                            <input 
                                type={!newPwdVisible ? 'password' : 'text'} 
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                className={pwdNotMatch ? 'invalid' : ''}
                            />
                            <button 
                                type="button"
                                className="icon_button tooltip"
                                tabIndex={-1}
                                onClick={() => { setNewPwdVisible(curr => !curr) }}
                            >
                                {!newPwdVisible ? <FiEye /> : <FiEyeOff />}
                                <span className="tooltip_text">{!newPwdVisible ? 'Show password' : 'Hide password'}</span>
                            </button>
                        </div>
                    </label>
                    <label>
                        Confirm password
                        <div className="input_group">
                            <input 
                                type={!confirmPwdVisible ? 'password' : 'text'} 
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className={pwdNotMatch ? 'invalid' : ''}
                            />
                            <button 
                                type="button"
                                className="icon_button tooltip"
                                tabIndex={-1}
                                onClick={() => { setConfirmPwdVisible(curr => !curr) }}
                            >
                                {!confirmPwdVisible ? <FiEye /> : <FiEyeOff />}
                                <span className="tooltip_text">{!confirmPwdVisible ? 'Show password' : 'Hide password'}</span>
                            </button>
                        </div>
                    </label>
                </div>
                <div className="form_actions">
                    <button type="reset">Back</button>
                    <button type="submit">Update and logout</button>
                </div>
            </form>
        </>
    )
}