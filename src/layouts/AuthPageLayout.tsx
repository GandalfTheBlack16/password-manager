import { Navigate } from "react-router";
import { loginStore } from "../stores/loginStore";

export function AuthPageLayout ({ children }: { children: JSX.Element }) {
    const { isLogged } = loginStore()
    return !isLogged ? <Navigate to={'/login'} replace/> : children
}