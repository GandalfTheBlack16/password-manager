import { Credential } from "../../../types"
import { VaultItem } from "../VaultItem"
import './Credential.css'

type Props = {
    credentials: Credential[],
    filterValue: string,
    vaultId: string
}

export function Credentials ({ credentials, filterValue, vaultId }: Props) {

    const filteredCredentials = credentials
        .filter(credential => filterValue.length > 0 && 
            credential.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()) || 
            credential.description.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
        )
        .map(credential => {
            return <VaultItem
                key={credential.id}
                id={credential.id}
                vaultId={vaultId}
                name={credential.name}
                description={credential.description}
                secret={credential.secret}
            />
        })
    
    return credentials.length < 1 ? 
        <div className="none_credential_container">
            <h4>Nothing stored here yet</h4>
            <p>Get started creating a new credential</p>
        </div> :
        <section className="vault-items">
        {
            filteredCredentials
        }
        </section>
}