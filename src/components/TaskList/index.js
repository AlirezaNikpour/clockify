import React, { useState } from 'react';
import styles from './TaskList.module.css';
import playIcon from '../../assets/img/play.svg';
import { useTaskContext } from '../../context/TaskContext';
import { activeTask, pauseTask } from '../../context/taskActions';
function TaskList() {
    const { tasks, dispatch } = useTaskContext();
    const [openRecordLists, setOpenRecordLists] = useState({});

    const handleOpenRecordList = (taskId) => {
        setOpenRecordLists(prevState => ({
            ...prevState,
            [taskId]: !prevState[taskId]
        }));
        console.log(openRecordLists)
    };

    const handleStart = (taskId) => {
        dispatch(activeTask({ id: taskId, active: true }));
    };

    const handleStop = (taskId) => {
        dispatch(pauseTask({ id: taskId, active: false }));
    };

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds % 60).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };
    return (
        <div>
            <div>
                <div className={styles.headline}>
                    <span>today</span>
                </div>
                <table>
                    <thead>
                        <tr className={styles.tr}>
                            <th className={styles.th}>
                                <div className={styles[`t-heading`]}>
                                    <div>
                                        <input id='customCheck1' type="checkbox" className={styles.checkbox} />
                                        <label htmlFor="customCheck1" className={styles[`control-label`]}>
                                        </label>
                                    </div>
                                    <div > Name </div>
                                </div>
                                <div></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <>
                                <tr className={`${styles.tr} ${task.active ? styles.active : ''}`} key={task.id}>
                                    <td className={styles.td}>
                                        <div>
                                            <div>
                                                <a onClick={() => handleOpenRecordList(task.id)} className={styles.entries} title={`${task.records.length} time entries (click to toggle)`}>
                                                    <span className={styles[`entries-badge`]}>{task.records.length}</span>
                                                </a>
                                                <div>
                                                    <input id={`check-${task.id}`} type="checkbox" />
                                                    <label htmlFor={`check-${task.id}`} className={styles['control-label']}>

                                                    </label>
                                                </div>
                                                <i className={styles.dot} style={{ background: task.project.projectColor }}></i>
                                                <a>{task.description}</a>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.td}>
                                        <div>
                                            <div>
                                                <a>{task.project.name}</a>
                                            </div>
                                            <div>
                                                <a>{task.project.client}</a>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`${styles.td} ${styles.range}`}>
                                        <div>
                                            <a>{task.start}</a>
                                        </div>
                                        <div>
                                            <a>{task.date}</a>
                                        </div>
                                    </td>
                                    <td className={`${styles.td}`}>
                                        <div>
                                            <a>{task.duration}</a>
                                        </div>
                                    </td>
                                    <td className={`${styles.td}`}>
                                        {task.active ? (<>
                                            <div onClick={() => handleStop(task.id)}>
                                                <div className={styles.pause}>
                                                    STOP
                                                </div>
                                            </div>
                                        </>) : (<>
                                            <div onClick={() => handleStart(task.id)}>
                                                <img alt='Start' src={playIcon} />
                                            </div>
                                        </>)}
                                    </td>
                                </tr>
                                {openRecordLists[task.id] && (
                                    task.records.map(record => (
                                        <tr className={`${styles.tr} ${task.active ? styles.activeRecord : ''}`} key={task.id}>
                                            <td className={styles.td}>
                                                <div>
                                                    <div>
                                                        <div>
                                                            <input id={`check-${task.id}`} type="checkbox" />
                                                            <label htmlFor={`check-${task.id}`} className={styles['control-label']}>
                                                                {/* Add label text here */}
                                                            </label>
                                                        </div>
                                                        <a>{task.description}</a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={styles.td}>
                                                <div>
                                                    <div>
                                                        <a>{task.project.name}</a>
                                                    </div>
                                                    <div>
                                                        <a>{task.project.client}</a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={`${styles.td} ${styles.range}`}>
                                                <div>
                                                    <a>{record.startTime}</a> - <a>{record.endTime}</a>
                                                </div>
                                                <div>
                                                    <a>{record.startDate}</a>
                                                </div>
                                            </td>
                                            <td className={`${styles.td}`}>
                                                <div>
                                                    <a>{formatDuration(record.duration)}</a>
                                                </div>
                                            </td>
                                            <td className={`${styles.td}`}>
                                            </td>
                                        </tr>
                                    )
                                    ))}
                            </>
                        ))}
                    </tbody>
                </table>

            </div>
        </div >
    )
}

export default TaskList;
