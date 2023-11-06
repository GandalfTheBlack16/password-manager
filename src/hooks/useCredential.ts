import { FormEvent, SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router"
import { generatePassword, updateCredentials } from "../services/VaultService"
import {  type Credential } from '../types'
import { useVaultStore } from "./stores/useVaultStore"

export function useCredential(vauldId: string, credential?: Credential) {

    const [name, setName] = useState<string>(credential?.name ?? '')
    const [description, setDescription] = useState<string>(credential?.description ?? '')
    const [secret, setSecret] = useState<string>(credential?.secret ?? '')
    const [showSecret, setShowSecret] = useState<boolean>(false)
    const [invalidMessage, setInvalidMessage] = useState<string[]>([])

    const navigate = useNavigate()

    const { updateVault } = useVaultStore()

    const handleNameChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setInvalidMessage([])
        setName(event.currentTarget.value)
    }
    
    const handleDescriptionChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setDescription(event.currentTarget.value)
    }
    
    const handleSecretChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setInvalidMessage([])
        setSecret(event.currentTarget.value)
    }

    const handleShowSecretChange = () => {
        setShowSecret(curr => !curr)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (name.length < 3) {
            setInvalidMessage(curr => [...curr, 'Credential name must be at least 3 characters length']) 
        }
        if (secret.length < 6) {
            setInvalidMessage(curr => [...curr, 'Password should have at least 6 characters length'])
        }
        if (invalidMessage.length === 0) {
            updateCredentials(vauldId, [{ id: credential?.id, name, description, secret }])
                .then(vault => {
                    updateVault(vault)
                    navigate('/vaults')
                })
                .catch(err => {
                    setInvalidMessage(err)
                })
        }
    }

    const handleReset = () => {
        navigate('/vaults')
    }

    const handleGeneratePassword = () => {
        const password = generatePassword()
        setSecret(password)
    }

    return {
        name,
        description,
        secret,
        showSecret,
        invalidMessage,
        handleNameChange,
        handleDescriptionChange,
        handleSecretChange,
        handleShowSecretChange,
        handleSubmit,
        handleReset,
        handleGeneratePassword
    }
}