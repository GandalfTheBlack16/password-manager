import { DialogProps, DialogType } from "../../../types";
import './Dialog.css'
import { FiX } from "react-icons/fi";
import { MdWarning, MdOutlineError, MdInfo, MdCheckCircle } from "react-icons/md";

export function Dialog ({ message, type, onClose }: DialogProps) {
    const dialogContainerClass = 'dialog-' + (type ?? 'info')
    const icon = setDialogIcon(type)
    return (
        <div className={"dialog-container " + dialogContainerClass}>
            <span>{ icon }{ message }</span>
            <button
                type="button"
                className="dialog-close"
                onClick={onClose}
            >
                <FiX size={18}/>
            </button>
        </div>
    )
}

function setDialogIcon (type?: DialogType | string) {
    switch(type) {
        case 'success': 
            return <MdCheckCircle size={26}/>
        case 'warning':
            return <MdWarning size={26}/>
        case 'error':
            return <MdOutlineError size={26}/>
        default:
            return <MdInfo size={26}/>
    }
}