import React from 'react';
import styles from './SelectProject.module.css';
import plusIcon from '../../assets/img/plus-blue.svg'
import { useProjectsContext } from '../../context/ProjectsContext';
function SelectProject({ projects, onSelectProject, toggle }) {
    const handleProjectClick = (project) => {
        onSelectProject(project);
    };

    const { openAddProjectModal } = useProjectsContext()

    return (
        <>
            <div className={styles[`project-dropdown`]}>
                <div className={styles[`dropdown-menu`]}>
                    <div className={styles[`dropdown-menu-header`]}>
                        <div className={styles[`input-group`]}>
                            <input type="text" className={styles[`form-control`]} placeholder="Find Project or Client..." />
                        </div>
                    </div>
                    <ul className={styles[`dropdown-items`]}>
                        {projects.map((project) => (
                            <li
                                key={project.id}
                                className={styles[`dropdown-item`]}
                                onClick={() => handleProjectClick(project)}
                            >
                                {project.name}
                            </li>
                        ))}
                    </ul>
                    <div className={styles['add-new']} onClick={openAddProjectModal}>
                        <img src={plusIcon} alt='plus' />
                        <span>create new project</span>
                    </div>
                </div>
                <div onClick={toggle} className={styles.backdrop}></div>
            </div>

        </>
    );
}

export default SelectProject;
