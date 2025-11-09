import { useState, SyntheticEvent } from "react"
import { checkUsernameAvailable, checkEmailAvailable, updateUserDetails } from '../services/AccountService';
import { useAuthStore } from "./stores/useAuthStore"
import { useNavigate } from "react-router";
import { useToast } from "./useToast";

type Available = {
    fetched: boolean,
    available: boolean
}

export function useAccount () {
    const {
        userId,
        username: currentUsername,
        email: currentEmail,
        updateDetails
    } = useAuthStore()

    const navigate = useNavigate()

    const [username, setUsername] = useState<string>(currentUsername)
    const [email, setEmail] = useState<string>(currentEmail)

    const [invalidUsername, setInvalidUsername] = useState<boolean>(false)
    const [invalidEmail, setInvalidEmail] = useState<boolean>(false)

    const [loadingUsername, setLoadingUsername] = useState<boolean>(false)
    const [loadingEmail, setLoadingEmail] = useState<boolean>(false)

    const [usernameAvailable, setUsernameAvailable] = useState<Available>({ fetched: false, available: false })
    const [emailAvailable, setEmailAvailable] = useState<Available>({ fetched: false, available: false })

    const { setSuccess, setError } = useToast()

    const handleChangeUsername = (event: SyntheticEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value)
        setInvalidUsername(false)
    }

    const handleBlurUsername = () => {
        if (username.trim().length < 3) {
            setInvalidUsername(true)
            setUsernameAvailable({ fetched: false, available: false })
        } else if (username !== currentUsername) {
            setLoadingUsername(true)
            checkUsernameAvailable(username)
                .then(available => {
                    setUsernameAvailable({ fetched: true, available })
                    setSuccess(`Username ${username} is available`)
                })
                .finally(() => {
                    setLoadingUsername(false)
                })
        } else {
            setUsernameAvailable({ fetched: false, available: false })
        }
    }

    const handleChangeEmail = (event: SyntheticEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
        setInvalidEmail(false)
    }

    const handleBlurEmail = () => {
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setInvalidEmail(true)
            setEmailAvailable({ fetched: false, available: false })
        } else if (email !== currentEmail) {
            setLoadingEmail(true)
            checkEmailAvailable(email)
                .then(available => {
                    setEmailAvailable({ fetched: true, available })
                })
                .finally(() => {
                    setLoadingEmail(false)
                })
        } else {
            setEmailAvailable({ fetched: false, available: false })
        }
    }

    const handleChangePassword = () => {
        navigate('password')
    }

    const handleReset = () => {
        setUsername(currentUsername)
        setEmail(currentEmail)
        setUsernameAvailable({ fetched: false, available: false })
        setEmailAvailable({ fetched: false, available: false })
    }

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { fetched: usernameFetched, available: usernameAvbl } = usernameAvailable
        const { fetched: emailFetched, available: emailAvbl } = emailAvailable

        if (invalidEmail) {
            setError('Email should be a valid email address')
        }

        if (invalidUsername) {
            setError('Username should have at least 3 characters')
        }

        if (invalidEmail || invalidUsername || (!usernameFetched && !emailFetched)) {
            return
        }

        if ((usernameFetched && !usernameAvbl) || (emailFetched && !emailAvbl)) {
            return
        }

        updateUserDetails({
            id: userId,
            username: usernameFetched ? username: undefined,
            email: emailFetched ? email: undefined
        }).then(({ email, username }) => {
            setSuccess('User details updated successfully. Logging out...')
            updateDetails(username, email)
            setUsernameAvailable({ fetched: false, available: false })
            setEmailAvailable({ fetched: false, available: false })
            navigate('/logout')
        }).catch(err => {
            setError(`Error updating user account: ${err}`)
        })
    }

    return {
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
    }
}