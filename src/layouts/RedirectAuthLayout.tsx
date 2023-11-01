import { Navigate } from "react-router";
import { loginStore } from "../stores/loginStore";

/**
 *  Layout to avoid navigate to /login or /signup pages if user is already authenticated 
 */
export function RedirectAuthLayout ({ children }: { children: JSX.Element }) {
    const { isLogged } = loginStore()

    return isLogged ? <Navigate to={'/vaults'} replace/> : children
}