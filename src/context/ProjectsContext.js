import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialProjectsState = [];

// Action types
export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';

// Reducer function
const projectsReducer = (state, action) => {
    switch (action.type) {
        case ADD_PROJECT:
            return [...state, action.payload];
        case REMOVE_PROJECT:
            return state.filter(project => project.id !== action.payload);
        default:
            return state;
    }
};

const ProjectsContext = createContext();

export const useProjectsContext = () => {
    return useContext(ProjectsContext);
};

const ProjectsProvider = ({ children }) => {
    const [projectsState, dispatch] = useReducer(projectsReducer, initialProjectsState);

    return (
        <ProjectsContext.Provider value={{ projectsState, dispatch }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export default ProjectsProvider;
