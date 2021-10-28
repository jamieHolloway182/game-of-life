import navStyles from '../../styles/Layout/Nav.module.css'
import Link from 'next/link'

const Nav = () => {
    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href = '/'>Home</Link>
                </li>
                <li>
                   <Link href = '/builder'>Builder</Link>
                </li>
                <li>
                    <Link href = '/presets'>Presets</Link>
                </li>
                <li>
                    <Link href= '/about'>About</Link>
                </li>
            </ul> 
        </nav>
    )
}

export default Nav
