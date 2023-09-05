import React from 'react'
import styles from './Clients.module.css'
import ClientHeader from './ClientHeader'
import AddClientForm from '../../components/AddClientForm'
import { useClientsContext } from '../../context/ClientContext'
import ClientList from '../../components/ClientList'
function Clients() {
    const { isAddClientModalOpen, closeAddClientModal } = useClientsContext();
    return (
        <div>
            <ClientHeader />
            <ClientList />
            <AddClientForm isOpen={isAddClientModalOpen} onClose={closeAddClientModal} />
        </div>
    )
}

export default Clients