import { useState } from "react"
import useValidatedInput from "../../hooks/useInputValidated"
import { fetchUsernameAvailable, signUp } from "../../services/AuthService"
import { validateEmail, validatePassword } from "../../util/validation-utils"
import TooltipIcon from "../ui/tooltip-icon/TooltipIcon"

export default function SignupForm() {

    const {
        value: username,
        isValid: isValidUsername,
        hasError: hasErrorUsername,
        changeHandler: onUsernameChanged,
        blurHandler: onUsernameBlurred,
        reset: resetUsername
    } = useValidatedInput(validateEmail)

    const {
        value: password,
        isValid: isValidPassword,
        hasError: hasErrorPassword,
        changeHandler: onPasswordChanged,
        blurHandler: onPasswordBlurred,
        reset: resetPassword
    } = useValidatedInput(validatePassword)

    const {
        value: confirmPassword,
        isValid: isValidConfirmPassword,
        hasError: hasErrorConfirmPassword,
        changeHandler: onConfirmPasswordChanged,
        blurHandler: onConfirmPasswordBlurred,
        reset: resetConfirmPassword
    } = useValidatedInput((input: string) => {
        return validatePassword(password) && input === password
    })

    const [ usernameIsLoading, setUsernameIsLoading ] = useState(false);
    const [ usernameIsAvailable, setUsernameIsAvailable ] = useState({ ready: false, available: false });

    const handleUsernameBlur = async (event: any) => {
        await onUsernameBlurred();
        if (validateEmail(event.target.value)){
            setUsernameIsLoading(true);
            const response = await fetchUsernameAvailable(username);
            const data = await response.json();
            setUsernameIsLoading(false);
            setUsernameIsAvailable({ ready: true, available: data.available });
        }
        else {
            setUsernameIsAvailable({ ready: false, available: false });
        }
    }

    const submitSignupForm = async (event:any) => {
        event.preventDefault();
        if (isValidUsername && isValidPassword && isValidConfirmPassword){
            resetUsername()
            resetPassword()
            resetPassword()
            signUp({ username, password });
        }
    }

    const renderExtraDiv = () => {
        return (
            <div className="extra">
            { usernameIsAvailable.ready && 
                <TooltipIcon
                    message={ usernameIsAvailable.available ? "Username is available": "Username is already taken" }
                    isValid={usernameIsAvailable.available}
                />
            }
            { usernameIsLoading &&
                <div className="loader"></div>
            }
        </div>
        )
    }

    return (
        <>
            <form onSubmit={submitSignupForm}>
                <div className="login_form__input">
                    <input
                        id='username_input'
                        type='text'
                        placeholder="Email"
                        className={hasErrorUsername ? 'invalid_input' : ''}
                        value={username}
                        onChange={onUsernameChanged}
                        onBlur={handleUsernameBlur}
                    />
                    {(usernameIsAvailable.ready || usernameIsLoading) && renderExtraDiv()}
                </div>
                {hasErrorUsername &&
                    <div className="validation_error">
                        Please, enter a valid email
                    </div>
                }
                <div className="login_form__input">
                    <input
                        id='password_input'
                        type='password'
                        placeholder="Password"
                        className={hasErrorPassword ? 'invalid_input' : ''}
                        value={password}
                        onChange={onPasswordChanged}
                        onBlur={onPasswordBlurred}
                    />
                </div>
                {hasErrorPassword &&
                    <div className="validation_error">
                        Invalid password. Password should be 6-32 characters length
                    </div>
                }
                <div className="login_form__input">
                    <input
                        id='confirmPass_input'
                        type='password'
                        placeholder="Confirm password"
                        className={hasErrorConfirmPassword ? 'invalid_input' : ''}
                        value={confirmPassword}
                        onChange={onConfirmPasswordChanged}
                        onBlur={onConfirmPasswordBlurred}
                    />
                </div>
                {hasErrorConfirmPassword &&
                    <div className="validation_error">
                        {password !== confirmPassword ? 'Passwords don\'t match' : 'Invalid password. Password should be 6-32 characters length'}
                    </div>
                }
                <div className="login_form__submit">
                    <input
                        type='submit'
                        value='Sign up'
                        disabled={!isValidUsername || !isValidPassword || !isValidConfirmPassword}
                    />
                </div>
            </form>
        </>
    )
}