import { Navigate } from "react-router";
import { useAuthStore } from "../hooks/stores/useAuthStore";
import logo from '../assets/logo-no-background.png'
import { Footer } from "../components/footer/Footer";
import { Link } from "react-router-dom";

type Props = {
    children: JSX.Element
    hiddenFooter?: boolean
}

export function PublicPageLayout ({ children, hiddenFooter }: Props) {
    const { isLogged } = useAuthStore()

    if(isLogged){
        return <Navigate to={'/vaults'} replace/>
    }

    return (
        <>
            <Link to='/login'>
                <img src={logo} className='logo-home'/>
            </Link>
            <main>
                { children }
            </main>
            {
                !hiddenFooter && <Footer />
            }
        </>
    )
}