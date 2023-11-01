import { Navigate } from "react-router";
import { useAuthStore } from "../hooks/useAuthStore";

/**
 *  Layout to avoid navigate to /login or /signup pages if user is already authenticated 
 */
export function RedirectAuthLayout ({ children }: { children: JSX.Element }) {
    const { isLogged } = useAuthStore()

    return isLogged ? <Navigate to={'/vaults'} replace/> : children
}