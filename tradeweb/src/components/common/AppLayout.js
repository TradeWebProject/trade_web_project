//components
import { useLocation } from "react-router-dom";
import React from "react";
import Nav from "../nav/Nav";
import Chat from "../chatlist/ChatControl";

const AppLayout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {<Nav />}
      {children}
      {<Chat />}
    </>
  );
};

export default AppLayout;
