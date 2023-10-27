import { FiUnlock, FiLogOut, FiUser } from 'react-icons/fi'
import logo from "../../assets/logo-no-background.svg"
import { HeaderProps } from "../../types"
import './Header.css'

export function Header ({ isLogged }: HeaderProps) {
    return (
        <header>
            <img 
                src={logo} 
                alt="Password manager logo" 
                className="logo"
            />
            <nav>
            {
                isLogged &&
                <section className="main_menu">
                <div>
                    <FiUnlock />
                    <span>Vaults</span>
                </div>
                <div className="selected">
                    <FiUser />
                    <span>My Account</span>
                </div>
                <div>
                    <FiLogOut /> 
                    <span>Logout</span>
                </div>
                </section>
            }
            </nav>
        </header>
    )
}