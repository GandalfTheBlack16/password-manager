import { FiPlus, FiTrash } from 'react-icons/fi'
import { VaultItem } from "./VaultItem";
import { useVaults } from '../../hooks/useVaults';
import './Vaults.css'

export function Vaults() {

    const { vaultList, loading, handleAddCredential, handleCreateVault, handleRemoveVault } = useVaults()

    return (
        <ul className="vault-list">
            {
                loading ? <div className='loader'></div> :
                    vaultList.length < 1 ? <div className="none_vaults">
                        <h3>None vaults found</h3>
                        <button onClick={handleCreateVault}>Create vault</button>
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
                                            onClick={() => { handleRemoveVault(vault.id) }}
                                        >
                                            <FiTrash size={'20px'} /> Remove vault
                                        </button>
                                    </div>
                                </section>
                                {vault.credentials.length < 1 ? <div style={{ margin: '2rem auto 0', width: '100%' }}>
                                    <h4 style={{fontWeight: '600', marginBlockEnd: '0'}}>Nothing stored here yet</h4>
                                    <p>Get started creating a new credential</p>
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