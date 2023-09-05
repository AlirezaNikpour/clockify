import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ADD_PROJECT, REMOVE_PROJECT, LOAD_PROJECTS } from './actionTypes';
import { useState } from 'react';

const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds % 60).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
const durationStringToSeconds = (durationString) => {
    const [hours, minutes, seconds] = durationString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};

export const countTasksPerProject = (projectsState, tasks) => {
    const projectDurationStats = {};

    projectsState.forEach(project => {
        const projectId = project.id;
        const projectTasks = tasks?.filter(task => task.project.id === projectId);
        if (projectTasks === undefined) {
            return
        }

        const totalDurationInSeconds = projectTasks.reduce((acc, task) => {
            const taskDurationInSeconds = durationStringToSeconds(task.duration);
            return acc + taskDurationInSeconds;
        }, 0);

        projectDurationStats[project.id] = {
            taskCount: projectTasks.length,
            totalProjectDuration: formatDuration(totalDurationInSeconds),
        };
    });

    return projectDurationStats;
};

// Initial state
const initialProjectsState = [];

// Reducer function
const projectsReducer = (state, action) => {
    switch (action.type) {
        case ADD_PROJECT:
            return [...state, action.payload];
        case REMOVE_PROJECT:
            return state.filter(project => project.id !== action.payload);
        case LOAD_PROJECTS:
            return action.payload;
        default:
            return state;
    }
};

const ProjectsContext = createContext();

export const useProjectsContext = () => {
    return useContext(ProjectsContext);
};

const ProjectsProvider = ({ children }) => {
    const calculateTotalProjectDuration = (tasks) => {
        return countTasksPerProject(projectsState, tasks)
    };
    const [projectsState, dispatch] = useReducer(projectsReducer, initialProjectsState);
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
    const [color, setColor] = useState({});
    const openAddProjectModal = () => {
        setIsAddProjectModalOpen(true);
    };

    const closeAddProjectModal = () => {
        setIsAddProjectModalOpen(false);
    };



    useEffect(() => {
        const savedProjects = localStorage.getItem('savedProjects');
        if (savedProjects) {
            dispatch({ type: 'LOAD_PROJECTS', payload: JSON.parse(savedProjects) });
        }
    }, []);



    useEffect(() => {
        localStorage.setItem('savedProjects', JSON.stringify(projectsState));
    }, [projectsState]);

    return (
        <ProjectsContext.Provider value={{ projectsState, dispatch, isAddProjectModalOpen, closeAddProjectModal, openAddProjectModal, setColor, color, calculateTotalProjectDuration }}>



            {children}
        </ProjectsContext.Provider>
    );
};

export default ProjectsProvider;
