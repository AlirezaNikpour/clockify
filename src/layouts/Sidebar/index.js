import React from 'react'
import styles from './Sidebar.module.css'
import { Link } from 'react-router-dom'
import timesheetsvg from '../../assets/img/timesheet.svg'
import timetrackersvg from '../../assets/img/time-tracker.svg'
import calendarsvg from '../../assets/img/calendar.svg'
import Projectssvg from '../../assets/img/projects.svg'
function Sidebar() {
    return (
        <aside>
            <div className={styles.wrapper}>
                <ul>
                    <li className={styles.item}>
                        <Link to='/timesheet'>
                            <span className={styles.icon}><img src={timesheetsvg} alt='timesheet' /></span>
                            <div>TimeSheet</div>
                        </Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/time-tracker'>
                            <span className={styles.icon}><img src={timetrackersvg} alt='time tracker' /></span>
                            <div>Time Tracker</div>
                        </Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/calender'>
                            <span className={styles.icon}><img src={calendarsvg} alt='calendar' /></span>
                            <div>Calendar</div>
                        </Link>
                    </li>
                </ul>
                <div class={styles.header}>
                    <span>Manage</span>
                </div>
                <ul>
                    <li className={styles.item}>
                        <Link to='/projects' >
                            <span className={styles.icon}><img src={Projectssvg} alt='Projects' /></span>
                            <div>Projects</div>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar