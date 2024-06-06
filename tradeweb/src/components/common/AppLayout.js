//components
import { useLocation } from "react-router-dom";
import React from "react";
import Nav from "../nav/Nav";

const AppLayout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {<Nav />}
      {children}
    </>
  );
};

export default AppLayout;
