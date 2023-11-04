import { useState } from 'react'
import { FiCopy, FiEye, FiEyeOff, FiEdit3 } from 'react-icons/fi' 

type Props = {
    id: string,
    name: string,
    description: string,
    secret: string
}

export function VaultItem ({ id, name, description, secret }: Props) {

    const [show, setShow] = useState<boolean>(false)

    const handleShowButtonClick = () => {
        setShow(curr => !curr)
    }

    const handleCopyButtonClick = () => {
        navigator.clipboard.writeText(secret)
    }

    return (
        <article className="item" key={id}>
            <div className="item_header">
                <div className="item_header-info">
                    <h3>{name}</h3>
                    <span>{description}</span>
                </div>
                <button
                    id={'editCred_' + id}
                    className='vault-header_actions'
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
                    className='tooltip'
                    onClick={handleShowButtonClick}
                >
                    {!show ? <FiEye size={'15px'} /> : <FiEyeOff size={'15px'} />}
                    <span className='tooltip_text'>Show credential</span>
                </button>
            </div>
        </article>
    )
}