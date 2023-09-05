import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ADD_TASK, ACTIVE_TASK, PAUSE_TASK, ADD_RECORD, LOAD_TASKS } from './actionTypes';
import dayjs from 'dayjs';
import { loadTasks } from './taskActions';
const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds % 60).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
const calculateRecordsDuration = (records) => {
    return records.reduce((total, record) => {
        const recordDurationInSeconds = parseInt(record.duration, 10);
        return total + recordDurationInSeconds;
    }, 0);
};
// Reducer function
const taskReducer = (state, action) => {
    switch (action.type) {
        case ADD_TASK:
            return [...state, action.payload];
        case ACTIVE_TASK:
            return state.map(task => {
                if (task.id === action.payload.id) {
                    const newRecord = {
                        startTime: dayjs(new Date()).format('hh:mm:ss'),
                        startDate: dayjs(new Date()).format('MMM/D/YYYY'),
                        endTime: null,
                        duration: null,
                    };

                    return {
                        ...task,
                        active: action.payload.active,
                        records: [...task.records, newRecord],
                    };
                } else {
                    return task;
                }
            });
        case LOAD_TASKS:
            return action.payload;
        case PAUSE_TASK:
            return state.map(task => {
                if (task.active) {
                    const recordsCopy = [...task.records];
                    const lastRecordIndex = recordsCopy.length - 1;

                    if (lastRecordIndex >= 0 && !recordsCopy[lastRecordIndex].endTime) {
                        const endTime = dayjs(new Date()).format('hh:mm:ss');
                        const startTime = recordsCopy[lastRecordIndex].startTime;
                        const startDate = recordsCopy[lastRecordIndex].startDate;

                        const startTimestamp = dayjs(`${startDate} ${startTime}`).unix();
                        const endTimestamp = dayjs(`${startDate} ${endTime}`).unix();

                        const elapsedTimeInSeconds = endTimestamp - startTimestamp;
                        const duration = elapsedTimeInSeconds;

                        recordsCopy[lastRecordIndex] = {
                            ...recordsCopy[lastRecordIndex],
                            endTime: endTime,
                            endDate: startDate,
                            duration: duration,
                        };

                        const totalDuration = calculateRecordsDuration(recordsCopy);
                        return {
                            ...task,
                            active: false,
                            records: recordsCopy,
                            duration: formatDuration(totalDuration),
                        };
                    }
                }
                return task;
            });

        case ADD_RECORD:
            return state.map(task => {
                if (task.id === action.payload.taskId) {
                    return {
                        ...task,
                        records: [...task.records, action.payload.record],
                    };
                }
                return task;
            });
        default:
            throw new Error(`Unrecognized action type: ${action.type}`);
    }
};

// Create context
const TaskContext = createContext();

// Provider component
export function TaskProvider({ children }) {
    const [tasks, dispatch] = useReducer(taskReducer, []);
    useEffect(() => {
        const savedTasks = localStorage.getItem('savedTasks');
        if (savedTasks) {
            dispatch(loadTasks(JSON.parse(savedTasks)));
        }
    }, []);

    // Save tasks to localStorage when tasks change
    useEffect(() => {
        localStorage.setItem('savedTasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, dispatch, formatDuration }}>
            {children}
        </TaskContext.Provider>
    );
}

// Custom hook for using the context
export function useTaskContext() {
    return useContext(TaskContext);
}
