import React from 'react'
import styles from './Header.module.css'
import UserSetting from '../../components/UserSetting'
import Notification from '../../components/Notification'
import HelpUser from '../../components/HelpUser'
import Logo from '../../assets/img/Logo.svg'
import NavbarToggler from '../../components/NavbarToggler'
function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <NavbarToggler />
                <div className={styles.logo}>
                    <img src={Logo} alt='Logo' />
                </div>
            </div>
            <div className={styles.right}>
                <div>
                    <HelpUser />
                </div>
                <div>
                    <Notification />
                </div>
                <div className={styles[`user-name`]}>
                    <UserSetting />
                </div>
            </div>
        </header>
    )
}

export default Header