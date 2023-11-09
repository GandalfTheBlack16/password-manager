import { Navigate } from "react-router";
import { useAuthStore } from "../hooks/stores/useAuthStore";
import logo from '../assets/logo-no-background.png'
import { Footer } from "../components/footer/Footer";

export function PublicPageLayout ({ children }: { children: JSX.Element }) {
    const { isLogged } = useAuthStore()

    if(isLogged){
        return <Navigate to={'/vaults'} replace/>
    }

    return (
        <>
            <img src={logo} style={{margin: 'auto'}} width={'350px'}/>
            <main>
                { children }
            </main>
            <Footer />
        </>
    )
}