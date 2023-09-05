import React from 'react'
import styles from './SelectClient.module.css'
import { useClientsContext } from '../../context/ClientContext';
function SelectClient({ onSelectClient, show }) {
    const { clientsState } = useClientsContext()
    const handleClientClick = (clientName) => {
        onSelectClient(clientName);
    };
    if (show) {
        return (
            <div className={styles[`dropdown-menu`]} >
                <div className={styles[`dropdown-menu-header`]}>
                    <div className={styles[`input-group`]}>
                        <input type="text" className={styles[`form-control`]} placeholder="Add/Find client…" />
                    </div>
                </div>
                <div>
                    <div className={styles[`scroll-area`]} >
                        <div className={styles[`scrollbar-wrapper`]} >
                            <div className={styles[`scroll-viewport-wrapper`]}>
                                <div className={styles[`scroll-layer`]} >
                                    <div className={styles[`scroll-layer`]}>
                                        <ul className={styles[`scroll-viewport`]} >
                                            <div className={styles[`scroll-items`]}>
                                                {clientsState.map(client => (
                                                    <li className={styles[`dropdown-item`]} onClick={() => handleClientClick(client.name)}>{client.name}</li>
                                                ))}
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default SelectClient