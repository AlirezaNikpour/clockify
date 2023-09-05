import { ADD_PROJECT, REMOVE_PROJECT, LOAD_PROJECTS } from './actionTypes';

export const addProject = project => ({
    type: ADD_PROJECT,
    payload: project,
});

export const removeProject = projectId => ({
    type: REMOVE_PROJECT,
    payload: projectId,
});

export const loadProjects = projects => ({
    type: 'LOAD_PROJECTS',
    payload: projects,
});
