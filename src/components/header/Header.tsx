import { FiUnlock, FiLogOut, FiUser } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import logo from "../../assets/logo-no-background.png"
import './Header.css'

export function Header() {
    const { pathname } = useLocation()
    return (
        <header>
            <Link
                className="logo"
                to={'/'}
            >
                <img
                    src={logo}
                    alt="Password manager logo"
                />
            </Link>
            <nav>
                <section className="main_menu">
                    <Link
                        className={pathname === '/vaults' ? 'selected menu_item' : 'menu_item'}
                        to={'/vaults'}
                    >
                        <FiUnlock />
                        <span>Vaults</span>
                    </Link>
                    <Link
                        className={pathname === '/account' ? 'selected menu_item' : 'menu_item'}
                        to={'/account'}
                    >
                        <FiUser />
                        <span>My Account</span>
                    </Link>
                    <Link
                        className='menu_item'
                        to={'/logout'}
                    >
                        <FiLogOut />
                        <span>Logout</span>
                    </Link>
                </section>
            </nav>
        </header>
    )
}