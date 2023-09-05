import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddClientForm.module.css';
import Modal from '../Modal';
import { useClientsContext } from '../../context/ClientContext';
import { addClient } from '../../context/clientActions';
import closeIcon from '../../assets/img/close.svg';
import { toast } from 'react-toastify';

function AddProjectForm({ isOpen, onClose }) {
    const { dispatch } = useClientsContext();
    const [clientName, setClientName] = useState('');
    const [clientOrganization, setClientOrganization] = useState('');

    const isValidInput = () => {
        if (clientName.trim().length < 2 || clientName.trim().length > 250) {
            toast.error('client name must be between 2 and 250 characters.');
            return false;
        }
        return true;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!isValidInput()) {
            return;
        }

        const newClient = { id: uuidv4(), name: clientName, organization: clientOrganization };
        handleAddClient(newClient);
    };

    const handleAddClient = (newClient) => {
        dispatch(addClient(newClient));
        setClientName('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleFormSubmit} className={styles['add-client-form']}>
                <div className={styles[`modal-header`]}>
                    <h2>Create New Client</h2>
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
                                    placeholder="enter client name"
                                    value={clientName}
                                    onChange={(event) => setClientName(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className={styles.col6}>
                            <div className={styles[`form-group`]}>
                                <input
                                    className={styles[`input-control`]}
                                    type="text"
                                    autoComplete="off"
                                    placeholder="enter organization name"
                                    value={clientOrganization}
                                    onChange={(event) => setClientOrganization(event.target.value)}
                                />
                            </div>
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
