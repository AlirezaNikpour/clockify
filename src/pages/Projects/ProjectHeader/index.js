import React from 'react';
import styles from './ProjectHeader.module.css';
import { useProjectsContext } from '../../../context/ProjectsContext';
function ProjectHeader() {
    const { openAddProjectModal } = useProjectsContext()

    return (
        <div className={styles.header}>
            <h1>Projects</h1>
            <button className={styles['add-new']} onClick={openAddProjectModal}>
                create new project
            </button>
        </div>
    );
}

export default ProjectHeader;
