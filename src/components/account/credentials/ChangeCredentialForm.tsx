import { useNavigate } from "react-router"

export function ChangeCredentialForm () {
    
    const navigate = useNavigate()

    const handleBackButton = () => {
        navigate('/account')
    }
    
    return (
        <>
            <h2>Update your password</h2>
            <button
                type="button"
                onClick={handleBackButton}
            >Back
            </button>
        </>
    )
}