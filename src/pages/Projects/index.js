import React, { useEffect } from 'react';
import { useProjectsContext } from '../../context/ProjectsContext';
import { removeProject } from '../../context/projectActions';
import styles from './Projects.module.css'
import ProjectHeader from './ProjectHeader';
import AddProjectForm from '../../components/AddProjectForm';
import { useTaskContext } from '../../context/TaskContext';
const Projects = () => {
    const { projectsState, dispatch, isAddProjectModalOpen, closeAddProjectModal, calculateTotalProjectDuration } = useProjectsContext();
    const { tasks } = useTaskContext()
    useEffect(() => { calculateTotalProjectDuration(tasks) }, [tasks])
    const handleRemoveProject = projectId => {
        dispatch(removeProject(projectId));
    };

    return (
        <div>
            <ProjectHeader />
            <div>
                <div className={styles.headline}>
                    <span>Projects</span>
                </div>
                <table>
                    <thead>
                        <tr className={styles.tr}>
                            <th className={styles.th}>
                                <div className={styles[`t-heading`]}>
                                    <div>
                                        <input id='customCheck1' type="checkbox" className={styles.checkbox} />
                                        <label htmlFor="customCheck1" className={styles[`control-label`]}>
                                        </label>
                                    </div>
                                    <div > Name </div>
                                </div>
                                <div></div>
                            </th>
                            <th className={styles.th} >
                                <div className={styles[`t-heading`]}>
                                    <a> client </a>
                                </div>
                            </th>
                            <th className={styles.th} >
                                <div className={styles[`t-heading`]}>
                                    <a> Tracked </a>
                                </div>
                            </th>
                            <th className={styles.th} >
                                <div className={styles[`t-heading`]}>
                                    <a> Amount </a>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectsState.map(project => (
                            <tr className={styles.tr} key={project.id}>
                                <td className={styles.td}>
                                    <div>
                                        <div className={styles.title}>
                                            <div>
                                                <input id={`check-${project.id}`} type="checkbox" />
                                                <label htmlFor={`check-${project.id}`} className={styles[`control-label`]}>
                                                </label>
                                            </div>
                                            <i className={styles.dot} style={{ background: project.projectColor }}></i>
                                            <a>{project.name}</a>
                                        </div>
                                        <a>
                                            <div className={styles.delete} onClick={() => handleRemoveProject(project.id)}>Remove</div>
                                        </a>
                                    </div>
                                </td>
                                <td className={styles.td}>
                                    <a>
                                        {project.client}
                                    </a>
                                </td>
                                <td className={styles.td}>
                                    <a>
                                        {project.totalProjectDuration}
                                    </a>
                                </td>
                                <td className={styles.td}>
                                    <a>
                                        0.06 USD
                                    </a>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <AddProjectForm isOpen={isAddProjectModalOpen} onClose={closeAddProjectModal} />
        </div>
    );
};

export default Projects;
