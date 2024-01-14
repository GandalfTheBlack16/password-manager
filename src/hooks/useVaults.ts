import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { fetchVaults, deleteVault, createVault } from "../services/VaultService"
import { useVaultStore } from "./stores/useVaultStore"
import { useToast } from "./useToast"

export function useVaults() {

    const {
        vaultList,
        loadedOnce,
        setVaults,
        createVault: addVaultToContext,
        deleteVaultById
    } = useVaultStore()

    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const { setSuccess, setError, setConfirmMessage } = useToast()

    useEffect(() => {
        if (!loadedOnce) {
            setLoading(true)
            fetchVaults()
                .then(vaults => {
                    setVaults(vaults)
                })
                .catch(err => {
                    setError(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [setVaults, loadedOnce, setError])

    const handleAddCredential = (vaultId: string) => {
        navigate(`credentials`, {
            state: {
                vaultId
            }
        })
    }

    const handleRemoveVault = (vaultId: string) => {
        setConfirmMessage('You\'re about to remove the vault. Are you sure?', () => {
            deleteVault(vaultId)
                .then(() => {
                    deleteVaultById(vaultId)
                })
                .catch(err => {
                    setError(err)
                })
        })
    }

    const handleCreateVault = () => {
        createVault()
            .then(vault => {
                addVaultToContext(vault)
                setSuccess('Vault created successfully')
            })
            .catch(err => {
                setError(err)
            })
    }

    return {
        vaultList,
        loading,
        handleAddCredential,
        handleRemoveVault,
        handleCreateVault
    }
}