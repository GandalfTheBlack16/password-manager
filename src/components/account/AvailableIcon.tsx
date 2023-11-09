import { FiCheckCircle, FiXCircle } from 'react-icons/fi'

type Props = {
    available: boolean,
    kind: string
}

export function AvailableIcon({ available, kind }: Props) {

    const icon = available ? 
        <FiCheckCircle 
            size={'22px'}
            color={'green'}
        /> : 
        <FiXCircle 
        size={'22px'}
        color={'brown'}
        />

    return (
        <div className='icon tooltip'>
            { icon }
            <span className='tooltip_text'>
                {
                    available ? `${kind} is available to use` : `${kind} is not available`
                }
            </span>
        </div>
    )
}