import { useState } from "react";
import useValidatedInput from "../../hooks/useInputValidated";
import { login, signUp, usernameAvailable } from "../../services/AuthService";
import { validateEmail, validatePassword } from "../../util/validation-utils";
import './Login.css';

function Login(){

    const {
        value: username,
        isValid: isValidUsername,
        hasError: hasErrorUsername,
        changeHandler: onUsernameChanged,
        blurHandler: onUsernameBlurred
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

    const onFormSwitched = (event: any) => {
        event.preventDefault();
        setIsLogin(current => !current);
        resetPassword();
        resetConfirmPassword();
    }

    const handleUsernameBlur = () => {
        onUsernameBlurred();
        if (!hasErrorUsername){
            const { data, error, loading } = usernameAvailable(username);
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
                    { hasErrorUsername && 
                        <div className="validation_error">
                            Please, enter a valid email 
                        </div>
                    }
                </div>
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
                    { hasErrorPassword && 
                        <div className="validation_error">
                            Invalid password. Password should be 6-32 characters length 
                        </div>
                    }
                </div>
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
                    { hasErrorUsername && 
                        <div className="validation_error">
                            Please, enter a valid email 
                        </div>
                    }
                </div>
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
                    { hasErrorPassword && 
                        <div className="validation_error">
                            Invalid password. Password should be 6-32 characters length 
                        </div>
                    }
                </div>
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
                    { hasErrorConfirmPassword && 
                        <div className="validation_error">
                            { password !== confirmPassword ? 'Passwords don\'t match': 'Invalid password. Password should be 6-32 characters length' }
                        </div>
                    }
                </div>
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