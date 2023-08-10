// components/ProjectsComponent.js

import React from 'react';
import { useProjectsContext } from '../../context/ProjectsContext';
import { addProject, removeProject } from '../../context/projectActions';

const Projects = () => {
    const { projectsState, dispatch } = useProjectsContext();

    const handleAddProject = () => {
        const newProject = { id: Math.random(), name: 'New Project' };
        dispatch(addProject(newProject));
    };

    const handleRemoveProject = projectId => {
        dispatch(removeProject(projectId));
    };

    return (
        <div>
            <h2>Projects</h2>
            <button onClick={handleAddProject}>Add Project</button>
            <ul>
                {projectsState.map(project => (
                    <li key={project.id}>
                        {project.name}{' '}
                        <button onClick={() => handleRemoveProject(project.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Projects;
