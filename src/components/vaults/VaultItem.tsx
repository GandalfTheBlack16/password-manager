import { useState } from 'react'
import { FiCopy, FiEye, FiEyeOff, FiEdit3 } from 'react-icons/fi' 
import { useNavigate } from 'react-router'

type Props = {
    id: string,
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

    return (
        <article className="item">
            <div className="item_header">
                <div className="item_header-info">
                    <h3>{name}</h3>
                    <span>{description}</span>
                </div>
                <button
                    id={'editCred_' + id}
                    className='vault-header_actions'
                    onClick={handleEditButtonClick}
                >
                    <FiEdit3 size={'15px'} /> Edit
                </button>
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