import { Navigate } from "react-router";
import { useAuthStore } from "../hooks/useAuthStore";

export function PublicPageLayout ({ children }: { children: JSX.Element }) {
    const { isLogged } = useAuthStore()

    if(isLogged){
        return <Navigate to={'/vaults'} replace/>
    }

    return (
        <main>
            { children }
        </main>
    )
}