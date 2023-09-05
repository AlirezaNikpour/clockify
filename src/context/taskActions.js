import { ADD_TASK, ACTIVE_TASK, PAUSE_TASK, ADD_RECORD, LOAD_TASKS } from './actionTypes';

export const addTask = task => ({
    type: ADD_TASK,
    payload: task,
});

export const activeTask = task => ({
    type: ACTIVE_TASK,
    payload: task,
})

export const pauseTask = task => ({
    type: PAUSE_TASK,
    payload: task,
})

export const addRecord = (taskId, record) => ({
    type: ADD_RECORD,
    payload: { taskId, record },
});

export const loadTasks = tasks => ({
    type: LOAD_TASKS,
    payload: tasks,
});
