import { FormEvent, SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router"
import { generatePassword, updateCredentials } from "../services/VaultService"
import {  type Credential } from '../types'
import { useVaultStore } from "./stores/useVaultStore"
import { useToast } from "./useToast"

export function useCredential(vauldId: string, credential?: Credential) {

    const [name, setName] = useState<string>(credential?.name ?? '')
    const [description, setDescription] = useState<string>(credential?.description ?? '')
    const [secret, setSecret] = useState<string>(credential?.secret ?? '')
    const [showSecret, setShowSecret] = useState<boolean>(false)
    const [invalidName, setInvalidName] = useState<boolean>(false)

    const navigate = useNavigate()

    const { updateVault } = useVaultStore()

    const { setSuccess, setError } = useToast()

    const handleNameChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
        setInvalidName(false)
    }
    
    const handleDescriptionChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setDescription(event.currentTarget.value)
    }
    
    const handleSecretChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setSecret(event.currentTarget.value)
    }

    const handleShowSecretChange = () => {
        setShowSecret(curr => !curr)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (name.length < 3) {
            setInvalidName(true)
            setError('Credential name must be at least 3 characters length')
            return
        }
        updateCredentials(vauldId, [{ id: credential?.id, name, description, secret }])
            .then(vault => {
                updateVault(vault)
                setSuccess(
                    !credential?.id ? 'Credential created!': 'Credential updated!'
                    )
                navigate('/vaults')
            })
            .catch(err => {
                setError(err)
            })
    }

    const handleReset = () => {
        navigate('/vaults')
    }

    const handleGeneratePassword = () => {
        const password = generatePassword()
        setSecret(password)
        setSuccess('Generated random password')
    }

    return {
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
    }
}