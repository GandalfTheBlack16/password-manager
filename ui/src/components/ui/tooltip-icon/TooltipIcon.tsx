import './TooltipIcon.css';
import ValidIcon from '../../../assets/valid-icon.svg';
import InvalidIcon from '../../../assets/invalid-icon.svg';

function TooltipIcon ({ message, isValid }: { message: string, isValid: boolean }) {


    const iconClass = `icon ${isValid ? 'valid': 'invalid'}`;
    const textClass = `popup-message ${isValid ? 'valid': 'invalid'}`;

    return (
        <div className='tooltip-icon__container'>
            <img className={iconClass} src={isValid ? ValidIcon: InvalidIcon}/>
            <div className={textClass}>
                { message }
            </div>
        </div>
    )
}

export default TooltipIcon;