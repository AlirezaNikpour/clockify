import React from 'react'
import styles from './ClientHeader.module.css'
import { useClientsContext } from '../../../context/ClientContext';
function ClientHeader() {

    const { openAddClientModal } = useClientsContext()

    return (
        <div className={styles.header}>
            <h1>Clients</h1>
            <button className={styles['add-new']} onClick={openAddClientModal}>
                Add New Client
            </button>
        </div>
    );
}

export default ClientHeader