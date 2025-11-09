import { Navigate } from "react-router";
import { useAuthStore } from "../hooks/stores/useAuthStore";
import { Header } from "../components/header/Header";
import { Toaster } from "react-hot-toast";

export function AuthPageLayout ({ children }: { children: JSX.Element }) {
    const { isLogged } = useAuthStore()
    if (!isLogged) {
        return <Navigate to={'/login'} replace/>
    }
    return (
        <>
            <Toaster 
                position="bottom-center"
            />
            <Header />
            <main>
                { children }
            </main>
        </>
    )
}