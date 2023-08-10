import React from 'react'
import notificationsvg from '../../assets/img/Notification.svg'
import styles from './Notification.module.css'
function Notification() {
    return (
        <div className={styles.wrapper}>
            <img src={notificationsvg} alt='notifications' />
        </div>
    )
}

export default Notification