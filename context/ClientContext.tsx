import React, { createContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface ClientContextValue {
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    token: string | null;
    setClientId: React.Dispatch<React.SetStateAction<string | null>>;
    clientId: string | null;
}

export const ClientContext = createContext<ClientContextValue>({
    setToken: () => { },
    token: null,
    setClientId: () => { },
    clientId: null,
});

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [token, setToken] = useState<string | null>(null);
    const [clientId, setClientId] = useState<string | null>(null);

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('TODO_TOKEN');
            setToken(token);
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    const getClientId = async () => {
        try {
            const id = await AsyncStorage.getItem('TODO_USERID');
            setClientId(id);
        } catch (error) {
            console.error('Error fetching client id:', error);
        }
    };

    useEffect(() => {
        getToken();
        getClientId();
    }, []);

    const values: ClientContextValue = {
        setToken,
        token,
        setClientId,
        clientId
    };

    return (
        <ClientContext.Provider value={values}>
            {children}
        </ClientContext.Provider>
    );
};

export default ClientProvider;
