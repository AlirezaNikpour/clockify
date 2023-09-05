import React, { useContext } from 'react'
import TrackerHeader from './TrackerHeader'
import TaskList from '../../components/TaskList'
import styles from './Tracker.module.css'
import AddProjectForm from '../../components/AddProjectForm'
import { useProjectsContext } from '../../context/ProjectsContext'
import { useEffect } from 'react'
import { useTaskContext } from '../../context/TaskContext'
function Tracker() {
    const { isAddProjectModalOpen, closeAddProjectModal, calculateTotalProjectDuration, projectsState, dispatch } = useProjectsContext();
    const { tasks } = useTaskContext();
    useEffect(() => {
        // Calculate total project duration stats for each project
        const projectDurationStats = calculateTotalProjectDuration(tasks);

        // Merge projectDurationStats with projectsState
        const mergedProjectsState = projectsState.map(project => ({
            ...project,
            ...projectDurationStats[project.id],
        }));
        dispatch({ type: 'LOAD_PROJECTS', payload: mergedProjectsState });

    }, [tasks])


    return (
        <div>
            <TrackerHeader />
            <div className={styles.main}>
                <TaskList />
            </div>
            <AddProjectForm isOpen={isAddProjectModalOpen} onClose={closeAddProjectModal} />
        </div>
    )
}

export default Tracker