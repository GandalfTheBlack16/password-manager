import { useEffect, useState } from "react"
import { Vault } from '../../types';
import { fetchVaults } from "../../services/VaultService"
import { FiPlus, FiTrash } from 'react-icons/fi' 
import { VaultItem } from "./VaultItem";
import './Vaults.css'
import { useNavigate } from "react-router";

export function Vaults () {

    const [vaultLit, setVaultList] = useState<Vault[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        fetchVaults()
        .then(vaults => {
            setVaultList(vaults)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleAddCredential = (vaultId: string) => {
        navigate(`credentials`, {
            state: {
                vaultId
            }
        })
    }

    return (
        <ul className="vault-list">
            {
                vaultLit.map((vault, index) => {
                    return <li key={vault.id}>
                       <section className="vault-header">
                        <div className="vault-header_details">
                            <h2>Vault #{index + 1}</h2>
                            <span>Last modified: {new Date(vault.lastModified).toLocaleString('en-GB', { timeZone: 'CET' })}</span>
                        </div>
                        <div className="vault-header_actions">
                            <button
                                onClick={() => { handleAddCredential(vault.id) }}
                            >
                                <FiPlus size={'20px'}/> Add credential
                            </button>
                            <button><FiTrash size={'20px'}/> Remove vault</button>
                        </div>
                       </section>
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
                    </li>    
                })
            }
        </ul>
    )
}