import React from 'react'
import helpsvg from '../../assets/img/Help.svg'
import styles from './HelpUser.module.css'
function HelpUser() {
    return (
        <div className={styles.wrapper}>
            <img src={helpsvg} alt='Help' />
        </div>
    )
}

export default HelpUser