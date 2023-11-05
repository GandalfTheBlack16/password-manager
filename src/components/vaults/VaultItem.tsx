import { useState } from 'react'
import { FiCopy, FiEye, FiEyeOff, FiEdit3, FiDelete } from 'react-icons/fi' 
import { useNavigate } from 'react-router'
import { deleteCredential } from '../../services/VaultService'

type Props = {
    id?: string,
    vaultId: string,
    name: string,
    description: string,
    secret: string
}

export function VaultItem ({ id, vaultId, name, description, secret }: Props) {

    const [show, setShow] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleShowButtonClick = () => {
        setShow(curr => !curr)
    }

    const handleCopyButtonClick = () => {
        navigator.clipboard.writeText(secret)
    }

    const handleEditButtonClick = () => {
        navigate(`credentials`, {
            state: {
                vaultId,
                credential: { id, name, description, secret }
            }
        })
    }

    const handleDeleteButtonClick = () => {
        if (id) {
            deleteCredential(vaultId, id)
            .then(vault => {
                navigate('/vaults', {
                    state: { vault }
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <article className="item">
            <div className="item_header">
                <div className="item_header-info">
                    <h3>{name}</h3>
                    <span>{description}</span>
                </div>
                <div className='item_header-actions'>
                    <button
                        id={'editCred_' + id}
                        onClick={handleEditButtonClick}
                        className='tooltip'
                    >
                        <FiEdit3 size={'15px'} />
                        <span className='tooltip_text'>
                            Edit credential
                        </span>
                    </button>
                    <button
                        id={'deleteCred_' + id}
                        onClick={handleDeleteButtonClick}
                        className='tooltip'
                    >
                        <FiDelete size={'15px'} />
                        <span className='tooltip_text'>
                            Delete credential
                        </span>
                    </button>
                </div>
            </div>
            <div className="item_action">
                <input 
                    id={id} 
                    type={!show ? "password" : "text"} 
                    value={secret} 
                    readOnly 
                />
                <button
                    id={'copyCred_' + id}
                    className='tooltip'
                    onClick={handleCopyButtonClick}
                >
                    <FiCopy size={'15px'} />
                    <span className='tooltip_text'>Add to clipboad</span>
                </button>
                <button
                    id={'showCred_' + id}
                    className={show ? 'toogle tooltip': 'tooltip'}
                    onClick={handleShowButtonClick}
                >
                    {!show ? <FiEye size={'15px'} /> : <FiEyeOff size={'15px'} />}
                    <span className='tooltip_text'>Show credential</span>
                </button>
            </div>
        </article>
    )
}