import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styles from './TrackerHeader.module.css';
import Card from '../../../layouts/Card';
import plusUrl from '../../../assets/img/plus-blue-req.svg';
import calenderIcon from '../../../assets/img/calendar-gray.svg';
import { addTask, pauseTask, addRecord } from '../../../context/taskActions';
import { toast } from 'react-toastify';
import { useTaskContext } from '../../../context/TaskContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { v4 as uuidv4 } from 'uuid';
import SelectProject from '../../../components/SelectProject';
import { useProjectsContext } from '../../../context/ProjectsContext';

function TrackerHeader() {
    const { tasks, dispatch, formatDuration } = useTaskContext();
    const activeTask = tasks.find(task => task.active);

    const { projectsState } = useProjectsContext();
    // Function to calculate total duration
    const calculateTotalDuration = (task) => {
        if (!task) {
            return 0;
        }
        let totalDuration = calculateRecordsDuration(task.records);
        if (task.active) {
            const lastRecord = task.records[task.records.length - 1];
            if (lastRecord && !lastRecord.endTime) {
                const elapsedTimeInSeconds = calculateElapsedTime(lastRecord.startTime);
                totalDuration += elapsedTimeInSeconds;
            }
        }

        return totalDuration;
    };

    const calculateRecordsDuration = (records) => {
        return records.reduce((total, record) => {
            const recordDurationInSeconds = parseInt(record.duration, 10);
            if (!isNaN(recordDurationInSeconds)) {
                return total + recordDurationInSeconds;
            } else {
                return total;
            }
        }, 0);
    };


    const calculateElapsedTime = (startTime) => {
        const startTimeParts = startTime.split(":");
        const startHour = parseInt(startTimeParts[0], 10);
        const startMinute = parseInt(startTimeParts[1], 10);
        const startSecond = parseInt(startTimeParts[2], 10);
        const now = dayjs().format('hh:mm:ss');
        const nowTimeParts = now.split(":");
        const currentHour = parseInt(nowTimeParts[0], 10);
        const currentMinute = parseInt(nowTimeParts[1], 10);
        const currentSecond = parseInt(nowTimeParts[2], 10);

        return (currentHour - startHour) * 3600 +
            (currentMinute - startMinute) * 60 +
            (currentSecond - startSecond);
    };

    // State for current duration
    const [currentDuration, setCurrentDuration] = useState(
        activeTask ? calculateTotalDuration(activeTask) : 0
    );

    // Interval timer for updating duration
    useEffect(() => {
        let intervalId;
        if (activeTask) {
            intervalId = setInterval(() => {
                setCurrentDuration(formatDuration(calculateTotalDuration(activeTask)));
            }, 1000);
        } else {
            clearInterval(intervalId);
            setCurrentDuration(formatDuration(0));
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [activeTask]);

    const [formState, setFormState] = useState({
        duration: activeTask ? activeTask.duration : formatDuration(0),
        description: activeTask ? activeTask.description : '',
        project: activeTask ? activeTask.project : '',
        start: activeTask ? activeTask.start : '',
        date: activeTask ? new Date(activeTask.date) : dayjs(new Date()).format('MMM/D/YYYY'),
        showCalendar: false,
        showProjectsList: false,
    });

    const toggleProjectDropdown = () => {
        setFormState(prevState => ({
            ...prevState,
            showProjectsList: !prevState.showProjectsList,
        }));
    };

    const handleProjectSelect = (selectedProject) => {
        setFormState(prevState => ({
            ...prevState,
            project: selectedProject,
            showProjectsList: false,
        }));
    };


    const getCurrentTime = () => {
        const now = new Date();
        return now.toISOString();
    };

    const triggerCalendar = () => {
        setFormState(prevState => ({
            ...prevState,
            showCalendar: !prevState.showCalendar,
        }));
    };

    const isValidInput = () => {
        const { description, project } = formState;

        switch (true) {
            case description.trim().length < 2 || description.trim().length > 250:
                toast.error('Description must be between 2 and 250 characters.');
                return false;
            case !project:
                toast.error('Please select a project.');
                return false;
            default:
                return true;
        }
    };

    const handlePauseTask = () => {
        dispatch(pauseTask({
            id: activeTask.id,
            active: false,
        }));

        setFormState(prevState => ({
            ...prevState,
            description: '',
            showCalendar: false,
        }));
    };

    const handleAddTask = () => {
        if (!isValidInput()) {
            return;
        }

        const currentTime = getCurrentTime();
        const newTask = {
            active: true,
            id: uuidv4(),
            description: formState.description,
            project: formState.project,
            start: dayjs(new Date()).format('hh:mm:ss'),
            duration: formState.duration,
            date: dayjs(formState.date).format('MMM/D/YYYY'),
            records: [],
        };

        const newRecord = {
            startTime: dayjs(new Date()).format('hh:mm:ss'),
            startDate: dayjs(formState.date).format('MMM/D/YYYY'),
            endTime: null,
            endDate: null,
            duration: formState.duration,
        };

        dispatch(addTask(newTask));
        dispatch(addRecord(newTask.id, newRecord));

        setFormState(prevState => ({
            ...prevState,
            description: '',
            start: currentTime,
            showCalendar: false,
        }));
    };


    const handleCalendarChange = (date) => {
        setFormState(prevState => ({
            ...prevState,
            date: date,
            showCalendar: false,
        }));
    };

    useEffect(() => {
        if (activeTask) {
            setFormState({
                ...formState,
                description: activeTask.description,
                project: activeTask.project,
                start: activeTask.start,
                date: new Date(activeTask.date),
                duration: activeTask.duration,
            });
        } else {
            setFormState({
                ...formState,
                description: "",
                duration: formatDuration(0),
                project: '',
                start: '',
                date: dayjs(new Date()).format('MMM/D/YYYY'),
            });
        }
    }, [activeTask]);

    return (
        <div className={styles[`recorder-container`]}>
            <Card>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles[`form-wrapper`]}>
                            <div className={styles.form}>
                                <input
                                    type="text"
                                    className={styles[`tracker-input`]}
                                    placeholder="What have you worked on?"
                                    value={formState.description}
                                    onChange={(event) =>
                                        setFormState(prevState => ({
                                            ...prevState,
                                            description: event.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles[`project-picker`]}>
                            <div
                                onClick={toggleProjectDropdown}
                                className={styles[`project-picker--label`]}
                            >
                                <img src={plusUrl} alt='plus' />
                                <span>Project</span>
                            </div>
                            {formState.showProjectsList && (
                                <SelectProject
                                    projects={projectsState}
                                    onSelectProject={handleProjectSelect}
                                    toggle={toggleProjectDropdown}
                                />
                            )}
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles[`tracker-entry-actions`]}>
                            <div className={styles[`date-picker`]}>
                                <img
                                    onClick={triggerCalendar}
                                    src={calenderIcon}
                                    alt='date picker'
                                />
                                {formState.showCalendar && (
                                    <div className={styles[`calender-wrapper`]}>
                                        <Calendar onChange={handleCalendarChange} value={formState.date} />
                                    </div>
                                )}
                                {dayjs(formState.date).format('MMM/D/YYYY')}
                            </div>
                            <div className={styles[`duration`]}>
                                <input
                                    type="text"
                                    className={styles[`time-picker-sum`]}
                                    value={currentDuration}
                                    onChange={(event) =>
                                        setFormState(prevState => ({
                                            ...prevState,
                                            duration: event.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                {activeTask ? (
                                    <div onClick={handlePauseTask} className={styles.pause}>STOP</div>
                                ) : (
                                    <div className={styles[`add-task`]} onClick={handleAddTask}>
                                        <div> Add </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default TrackerHeader;
