import { useEffect, useState } from "react"
import { Vault } from '../../types';
import { createVault, deleteVault, fetchVaults } from "../../services/VaultService"
import { FiPlus, FiTrash } from 'react-icons/fi'
import { VaultItem } from "./VaultItem";
import { useLocation, useNavigate } from "react-router";
import './Vaults.css'

export function Vaults() {

    const [vaultList, setVaultList] = useState<Vault[]>([])

    const navigate = useNavigate()

    const { state }: { state: { vault?: Vault } } = useLocation()

    useEffect(() => {
        if (!state?.vault) {
            fetchVaults()
                .then(vaults => {
                    setVaultList(vaults)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setVaultList([state.vault])
        }
    }, [state?.vault])

    const handleAddCredential = (vaultId: string) => {
        navigate(`credentials`, {
            state: {
                vaultId
            }
        })
    }

    const handleRemoveVaultButtonClick = (vaultId: string) => {
        deleteVault(vaultId)
            .then(() => {
                setVaultList([])
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleCreateVaultButtonClick = () => {
        createVault()
            .then(vault => {
                setVaultList([vault])
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <ul className="vault-list">
            {
                vaultList.length < 1 ? <div className="none_vaults">
                    <h3>None vaults found</h3>
                    <button onClick={handleCreateVaultButtonClick}>Create vault</button>
                </div> :
                    vaultList.map((vault) => {
                        return <li key={vault.id}>
                            <section className="vault-header">
                                <div className="vault-header_details">
                                    <h2>Private vault</h2>
                                    <span>Last modified: {new Date(vault.lastModified).toLocaleString('en-GB', { timeZone: 'CET' })}</span>
                                </div>
                                <div className="vault-header_actions">
                                    <button
                                        onClick={() => { handleAddCredential(vault.id) }}
                                    >
                                        <FiPlus size={'20px'} /> Add credential
                                    </button>
                                    <button
                                        onClick={() => { handleRemoveVaultButtonClick(vault.id) }}
                                    >
                                        <FiTrash size={'20px'} /> Remove vault
                                    </button>
                                </div>
                            </section>
                            {vault.credentials.length < 1 ? <div style={{ margin: 'auto', width: '100%' }}>
                                <h4>Nothing stored here yet: Create a new credential</h4>
                            </div> :
                                <section className="vault-items">
                                    {
                                        vault.credentials.map(credential => {
                                            return <VaultItem
                                                key={credential.id}
                                                id={credential.id}
                                                vaultId={vault.id}
                                                name={credential.name}
                                                description={credential.description}
                                                secret={credential.secret}
                                            />
                                        })
                                    }
                                </section>
                            }
                        </li>
                    })
            }
        </ul>
    )
}