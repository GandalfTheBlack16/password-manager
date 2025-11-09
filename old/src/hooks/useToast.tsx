import toast from "react-hot-toast"
import { FiCheck, FiX } from "react-icons/fi";

export function useToast() {

    const error = (msg: string) => {
        toast.error(msg, {
            duration: 4000,
            style: {
              backgroundColor: '#ff00006b',
              color: 'whitesmoke',
              maxWidth: '468px'
            }
        })
    }

    const success = (msg: string) => {
        toast.success(msg, {
            duration: 4000,
            style: {
                backgroundColor: "#00800099",
                color: "whitesmoke",
                maxWidth: '468px'
            }
        })
    }

    const confirmMessage = (msg: string, onAccept: () => void) => {
        toast(({ id }) => (
            <span style={{ fontSize: '14px' }}>
                { msg }
                    <button 
                        style={{ width: 'min-content', margin: '0 12px' }}
                        onClick={() => toast.dismiss(id)}>
                        <FiX />
                    </button>
                    <button 
                        style={{ width: 'min-content'}}
                        onClick={() => { onAccept(); toast.dismiss(id)}}>
                        <FiCheck />
                    </button>
            </span>
        ), {
            duration: 10000,
            style: {
                backgroundColor: "#0000004a",
                color: "whitesmoke",
                maxWidth: '800px'
            }
        })
    }
        

    return {
        setError: error,
        setSuccess: success,
        setConfirmMessage: confirmMessage
    }
}