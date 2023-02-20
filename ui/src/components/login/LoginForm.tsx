import useAuth from "../../hooks/useAuth";
import useValidatedInput from "../../hooks/useInputValidated"
import { validateEmail, validatePassword } from "../../util/validation-utils"

export default function LoginForm() {

    const {
        value: username,
        isValid: isValidUsername,
        hasError: hasErrorUsername,
        changeHandler: onUsernameChanged,
        blurHandler: onUsernameBlurred,
    } = useValidatedInput(validateEmail)

    const {
        value: password,
        isValid: isValidPassword,
        hasError: hasErrorPassword,
        changeHandler: onPasswordChanged,
        blurHandler: onPasswordBlurred,
        reset: resetPassword
    } = useValidatedInput(validatePassword)

    const { login, error: loginError, resetError: resetLoginError } = useAuth();

    const submitLoginForm = async (event:any) => {
        event.preventDefault();
        if (isValidUsername && isValidPassword){
            resetLoginError()
            resetPassword()
            login({ username, password })
        }
    }

    return (
        <>
            <form onSubmit={submitLoginForm}>
                <div className="login_form__input">
                    <input
                        id='username_input'
                        type='text'
                        placeholder="Email"
                        className={hasErrorUsername ? 'invalid_input' : ''}
                        value={username}
                        onChange={onUsernameChanged}
                        onBlur={onUsernameBlurred}
                    />
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
                <div className="login_form__submit">
                    <input
                        type='submit'
                        value='Login'
                        disabled={!isValidUsername || !isValidPassword}
                    />
                </div>
            </form>
            {loginError &&
                <div className="errors">
                    <span>{loginError}</span>
                </div>
            }
        </>
    )
}