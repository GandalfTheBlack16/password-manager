import toast from "react-hot-toast"

export function useToast() {

    const error = (msg: string) => {
        toast.error(msg, {
            position:"bottom-center",
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
            position: "bottom-center",
            duration: 4000,
            style: {
                backgroundColor: "#00800099",
                color: "whitesmoke",
                maxWidth: '468px'
            }
        })
    }
        

    return {
        setError: error,
        setSuccess: success
    }
}