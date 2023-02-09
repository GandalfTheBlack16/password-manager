import { useState } from "react";
import useValidatedInput from "../../hooks/useInputValidated";
import { login, signUp, fetchUsernameAvailable } from "../../services/AuthService";
import { validateEmail, validatePassword } from "../../util/validation-utils";
import TooltipIcon from "../ui/tooltip-icon/TooltipIcon";
import './Login.css';

function Login(){

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

    const [ isLogin, setIsLogin ] = useState(true);
    const [ usernameIsLoading, setUsernameIsLoading ] = useState(false);
    const [ usernameIsAvailable, setUsernameIsAvailable ] = useState({ ready: false, available: false });

    const onFormSwitched = (event: any) => {
        event.preventDefault();
        setIsLogin(current => !current);
        resetUsername();
        resetPassword();
        resetConfirmPassword();
    }

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

    const submitLoginForm = async (event:any) => {
        event.preventDefault();
        if (isValidUsername && isValidPassword){
            login({ username, password });
        }
    }

    const submitSignupForm = async (event:any) => {
        event.preventDefault();
        if (isValidUsername && isValidPassword && isValidConfirmPassword){
            signUp({ username, password });
        }
    }

    const renderLoginForm = () => {
        return (
            <>
            <h2>Login into your account</h2>
            <form onSubmit={submitLoginForm}>
                <div className="login_form__input">
                    <input 
                        id='username_input'
                        type='text'
                        placeholder="Email"
                        className={ hasErrorUsername ? 'invalid_input': '' }
                        value={ username }
                        onChange={ onUsernameChanged }
                        onBlur={ onUsernameBlurred }
                    />
                </div>
                { hasErrorUsername && 
                    <div className="validation_error">
                        Please, enter a valid email 
                    </div>
                }
                <div className="login_form__input">
                    <input 
                        id='password_input'
                        type='password'
                        placeholder="Password"
                        className={ hasErrorPassword ? 'invalid_input': '' }
                        value={ password }
                        onChange={ onPasswordChanged }
                        onBlur={ onPasswordBlurred }
                    />
                </div>
                { hasErrorPassword && 
                    <div className="validation_error">
                        Invalid password. Password should be 6-32 characters length 
                    </div>
                }
                <div className="login_form__submit">
                    <input 
                        type='submit'
                        value='Login'
                        disabled={!isValidUsername || !isValidPassword }
                    />
                </div>
            </form>
            </>
        );
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

    const renderSignupForm = () => {
        return (
            <>
            <h2>Create a new account</h2>
            <form onSubmit={submitSignupForm}>
                <div className="login_form__input">
                    <input 
                        id='username_input'
                        type='text'
                        placeholder="Email"
                        className={ hasErrorUsername ? 'invalid_input': '' }
                        value={ username }
                        onChange={ onUsernameChanged }
                        onBlur={ handleUsernameBlur }
                    />
                    { (usernameIsAvailable.ready || usernameIsLoading) && renderExtraDiv() }
                </div>
                { hasErrorUsername && 
                    <div className="validation_error">
                        Please, enter a valid email 
                    </div>
                }
                <div className="login_form__input">
                    <input 
                        id='password_input'
                        type='password'
                        placeholder="Password"
                        className={ hasErrorPassword ? 'invalid_input': '' }
                        value={ password }
                        onChange={ onPasswordChanged }
                        onBlur={ onPasswordBlurred }
                    />
                </div>
                { hasErrorPassword && 
                    <div className="validation_error">
                        Invalid password. Password should be 6-32 characters length 
                    </div>
                }
                <div className="login_form__input">
                    <input 
                        id='confirmPass_input'
                        type='password'
                        placeholder="Confirm password"
                        className={ hasErrorConfirmPassword ? 'invalid_input': '' }
                        value={ confirmPassword }
                        onChange={ onConfirmPasswordChanged }
                        onBlur={ onConfirmPasswordBlurred }
                    />
                </div>
                { hasErrorConfirmPassword && 
                    <div className="validation_error">
                        { password !== confirmPassword ? 'Passwords don\'t match': 'Invalid password. Password should be 6-32 characters length' }
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
        );
    }

    return (
        <>
        <div className="login_form">
            { isLogin ? renderLoginForm(): renderSignupForm() }
            <div className="login_switch">
                { isLogin ? "Don't have an account? ": "Have an account already? " }
                <a 
                    onClick={onFormSwitched}>
                    { isLogin ? "Sign up": "Log in" }
                </a>
            </div>
        </div>
        </>
    );
}

export default Login;