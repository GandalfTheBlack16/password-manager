import { Navigate } from "react-router";
import { useAuthStore } from "../hooks/useAuthStore";

export function AuthPageLayout ({ children }: { children: JSX.Element }) {
    const { isLogged } = useAuthStore()
    return !isLogged ? <Navigate to={'/login'} replace/> : children
}