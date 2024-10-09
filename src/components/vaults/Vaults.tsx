import { FiPlus, FiTrash, FiX } from 'react-icons/fi'
import { useVaults } from '../../hooks/useVaults';
import './Vaults.css'
import { Credentials } from './credential/Credentials';

export function Vaults() {

    const { vaultList, loading, filterValue, handleAddCredential, handleCreateVault, handleRemoveVault, handleFilterChange, clearFilter } = useVaults()

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
                                            <FiPlus className='icon' /> Add credential
                                        </button>
                                        <button
                                            onClick={() => { handleRemoveVault(vault.id) }}
                                        >
                                            <FiTrash className='icon' /> Remove vault
                                        </button>
                                    </div>
                                </section>
                                {
                                    vault.credentials.length > 0 && 
                                    <div className='filter_container'>
                                        <input
                                            autoFocus 
                                            type='text'
                                            placeholder='Filter'
                                            value={filterValue}
                                            onChange={handleFilterChange}
                                        />
                                        <button
                                            onClick={clearFilter}
                                        >
                                            <FiX className='icon'/>
                                            <span>Clear</span>
                                        </button>
                                    </div>
                                }
                                <Credentials 
                                    credentials={vault.credentials}
                                    vaultId={vault.id}
                                    filterValue={ filterValue }
                                />
                            </li>
                        })
            }
        </ul>
    )
}