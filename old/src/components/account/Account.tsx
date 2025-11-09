import { AvailableIcon } from './AvailableIcon'
import './Account.css'
import { useAccount } from '../../hooks/useAccount'

export function Account() {

    const {
        invalidUsername,
        invalidEmail,
        username,
        email,
        emailAvailable,
        usernameAvailable,
        loadingUsername,
        loadingEmail,
        handleChangeUsername,
        handleChangeEmail,
        handleBlurUsername,
        handleBlurEmail,
        handleChangePassword,
        handleReset,
        handleSubmit
    } = useAccount()

    return (
        <>
            <h2>Your account's details</h2>
            <form
                className="account_form"
                onReset={handleReset}
                onSubmit={handleSubmit}
            >
                <div className='inputs'>
                    <label>
                        Username
                        <div>
                            <input
                                autoFocus
                                type="text"
                                value={username}
                                onChange={handleChangeUsername}
                                onBlur={handleBlurUsername}
                                className={invalidUsername ? 'invalid' : ''}
                                required
                            />
                            {loadingUsername && <span className='loading'></span>}
                            {!loadingUsername && usernameAvailable.fetched &&
                                <AvailableIcon
                                    available={usernameAvailable.available}
                                    kind='Username'
                                />
                            }
                        </div>
                    </label>
                    <label>
                        Email
                        <div>
                            <input
                                type="text"
                                value={email}
                                onChange={handleChangeEmail}
                                onBlur={handleBlurEmail}
                                className={invalidEmail ? 'invalid' : ''}
                                required
                            />
                            {loadingEmail && <span className='loading'></span>}
                            {!loadingEmail && emailAvailable.fetched &&
                                <AvailableIcon
                                    available={emailAvailable.available}
                                    kind='Email'
                                />
                            }
                        </div>
                    </label>
                </div>
                <div className='change_password'>
                    <button type="button" onClick={handleChangePassword}>
                        Change password
                    </button>
                </div>
                <div className='form_actions'>
                    <button type="reset">Restore</button>
                    <button type="submit">Update and logout</button>
                </div>
            </form>
        </>
    )
}