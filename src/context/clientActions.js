import { ADD_CLIENT, REMOVE_CLIENT, LOAD_CLIENTS } from './actionTypes';

export const addClient = client => ({
    type: ADD_CLIENT,
    payload: client,
});

export const removeClient = clientId => ({
    type: REMOVE_CLIENT,
    payload: clientId,
});

export const loadClients = clients => ({
    type: LOAD_CLIENTS,
    payload: clients,
});
