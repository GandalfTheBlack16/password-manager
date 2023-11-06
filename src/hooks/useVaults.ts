import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { fetchVaults, deleteVault, createVault } from "../services/VaultService"
import { useVaultStore } from "./stores/useVaultStore"

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

    useEffect(() => {
        if (!loadedOnce) {
            setLoading(true)
            fetchVaults()
                .then(vaults => {
                    setVaults(vaults)
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [setVaults, loadedOnce])

    const handleAddCredential = (vaultId: string) => {
        navigate(`credentials`, {
            state: {
                vaultId
            }
        })
    }

    const handleRemoveVault = (vaultId: string) => {
        deleteVault(vaultId)
            .then(() => {
                deleteVaultById(vaultId)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleCreateVault = () => {
        createVault()
            .then(vault => {
                addVaultToContext(vault)
            })
            .catch(err => {
                console.log(err)
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