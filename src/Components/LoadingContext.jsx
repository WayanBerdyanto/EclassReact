import React, { createContext, useState, useContext } from 'react';
import ReactLoading from 'react-loading';

const LoadingContext = createContext();

export const useLoading = () => {
    return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const value = {
        loading,
        setLoading,
    };

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

export const LoadingState = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={60} width={60} />
);
