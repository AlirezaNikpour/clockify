import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { ADD_CLIENT, LOAD_CLIENTS, REMOVE_CLIENT } from './actionTypes';

// Initial state
const initialClientsState = [];

const clientsReducer = (state, action) => {
    switch (action.type) {
        case ADD_CLIENT:
            return [...state, action.payload];
        case REMOVE_CLIENT:
            return state.filter(client => client.id !== action.payload);
        case LOAD_CLIENTS:
            return action.payload;
        default:
            return state;
    }
};

const ClientsContext = createContext();

export const useClientsContext = () => {
    return useContext(ClientsContext);
};

const ClientsProvider = ({ children }) => {
    const [clientsState, dispatch] = useReducer(clientsReducer, initialClientsState);
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

    const openAddClientModal = () => {
        setIsAddClientModalOpen(true);
    };

    const closeAddClientModal = () => {
        setIsAddClientModalOpen(false);
    };
    // Load clients from localStorage when the app initializes
    useEffect(() => {
        const savedClients = localStorage.getItem('savedClients');
        if (savedClients) {
            dispatch({ type: LOAD_CLIENTS, payload: JSON.parse(savedClients) });
        }
    }, []);

    // Save clients to localStorage when clientsState changes
    useEffect(() => {
        localStorage.setItem('savedClients', JSON.stringify(clientsState));
    }, [clientsState]);
    return (
        <ClientsContext.Provider value={{ clientsState, dispatch, openAddClientModal, closeAddClientModal, isAddClientModalOpen }}>
            {children}
        </ClientsContext.Provider>
    );
};

export default ClientsProvider;