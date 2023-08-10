import { ADD_PROJECT, REMOVE_PROJECT } from './actionTypes'; // Import the action types

export const addProject = project => ({
    type: ADD_PROJECT,
    payload: project,
});

export const removeProject = projectId => ({
    type: REMOVE_PROJECT,
    payload: projectId,
});