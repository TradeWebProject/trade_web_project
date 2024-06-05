//components
import { useLocation } from "react-router-dom";
import React from 'react';

const AppLayout = ({ children }) => {
    const location = useLocation();

    return (
        <>
            {children}
      </>
    );
};

export default AppLayout;