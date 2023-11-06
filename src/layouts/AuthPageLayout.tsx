import { Navigate } from "react-router";
import { useAuthStore } from "../hooks/stores/useAuthStore";
import { Header } from "../components/header/Header";

export function AuthPageLayout ({ children }: { children: JSX.Element }) {
    const { isLogged } = useAuthStore()
    if (!isLogged) {
        return <Navigate to={'/login'} replace/>
    }
    return (
        <>
            <Header />
            <main>
                { children }
            </main>
        </>
    )
}