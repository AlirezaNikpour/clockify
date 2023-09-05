import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddProjectForm.module.css';
import Modal from '../Modal';
import { useProjectsContext } from '../../context/ProjectsContext';
import { addProject } from '../../context/projectActions';
import closeIcon from '../../assets/img/close.svg';
import { toast } from 'react-toastify';
import SelectClient from '../SelectClient';
import ColorPicker from '../ColorPicker';

function AddProjectForm({ isOpen, onClose }) {
    const { dispatch, color } = useProjectsContext();
    const [projectName, setProjectName] = useState('');
    const [clientName, setClientName] = useState('');
    const [showClientList, setShowClientList] = useState(false)

    const isValidInput = () => {
        if (projectName.trim().length < 2 || projectName.trim().length > 250) {
            toast.error('Project name must be between 2 and 250 characters.');
            return false;
        }
        return true;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!isValidInput()) {
            return;
        }

        const newProject = { id: uuidv4(), name: projectName, client: clientName, projectColor: color.rgba };
        handleAddProject(newProject);
    };

    const handleClientSelect = (selectedClient) => {
        setClientName(selectedClient);
        setShowClientList(!showClientList)
    };

    const triggerShowClientList = () => {
        setShowClientList(!showClientList)
    }

    const handleAddProject = (newProject) => {
        dispatch(addProject(newProject));
        setProjectName('');
        setClientName('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleFormSubmit} className={styles['add-project-form']}>
                <div className={styles[`modal-header`]}>
                    <h2>Create new project</h2>
                    <button type="button" className={styles.close} onClick={onClose}>
                        <span>
                            <img alt="close" src={closeIcon} />
                        </span>
                    </button>
                </div>
                <div className={styles[`modal-body`]}>
                    <div className={styles.row}>
                        <div className={styles.col6}>
                            <div className={styles[`form-group`]}>
                                <input
                                    className={styles[`input-control`]}
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Enter project name"
                                    value={projectName}
                                    onChange={(event) => setProjectName(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className={styles.col6}>
                            <div className={styles[`form-group`]}>
                                <div className={styles.dropdown}>
                                    <div onClick={triggerShowClientList} className={styles.btn}> {clientName.length > 0 ? (clientName) : (<>Select Client</>)} </div>
                                    <SelectClient show={showClientList} onSelectClient={handleClientSelect} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div>
                            <ColorPicker />
                        </div>
                    </div>
                </div>
                <div className={styles[`modal-footer`]}>
                    <a className={styles[`color-blue`]} onClick={onClose}> Cancel </a>
                    <div className={styles[`add-new`]}>
                        <button type="submit"> Create </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default AddProjectForm;
