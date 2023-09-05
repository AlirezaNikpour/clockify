import React from 'react'
import styles from './Clientlist.module.css'
import { useClientsContext } from '../../context/ClientContext'
import { removeClient } from '../../context/clientActions'
function ClientList() {
    const { clientsState, dispatch, isAddProjectModalOpen, closeAddProjectModal } = useClientsContext();

    const handleRemoveClient = clientId => {
        dispatch(removeClient(clientId));
    };
    return (
        <div>
            <div className={styles.headline}>
                <span>Clients</span>
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
                                <a> Organization </a>
                            </div>
                        </th>
                        <th className={styles.th} >
                            <div className={styles[`t-heading`]}>
                                <a>  </a>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {clientsState.map(client => (
                        <tr className={styles.tr} key={client.id}>
                            <td className={styles.td}>
                                <div>
                                    <div>
                                        <div>
                                            <input id={`check-${client.id}`} type="checkbox" />
                                            <label htmlFor={`check-${client.id}`} className={styles[`control-label`]}>
                                            </label>
                                        </div>
                                        <a>{client.name}</a>
                                    </div>

                                </div>
                            </td>
                            <td className={styles.td}>
                                <a>
                                    {client.organization}
                                </a>
                            </td>

                            <td className={styles.td}>
                                <a>
                                    <div className={styles.delete} onClick={() => handleRemoveClient(client.id)}>Remove</div>
                                </a>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ClientList