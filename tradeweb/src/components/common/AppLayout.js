//components
import { useLocation } from "react-router-dom";
import React from "react";
import Nav from "../nav/Nav";
import Chat from "../chatlist/ChatControl";
import Footer from "../footer/Footer";
import styled from "styled-components";

const AppLayout = ({ children }) => {
  const location = useLocation();

  return (
    <Container>
      {<Nav />}
      {children}
      {<Chat />}
      {<Footer />}
    </Container>
  );
};

export default AppLayout;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
