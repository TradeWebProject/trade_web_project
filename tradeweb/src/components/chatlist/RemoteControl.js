import React from "react";
import styled from "styled-components";
import { FaArrowUp, FaArrowDown, FaComment } from "react-icons/fa";
import { theme } from "../../styles/theme";

const RemoteControl = ({ onTopClick, onBottomClick, onChatClick }) => {
  return (
    <RemoteContainer>
      <Button onClick={onTopClick}>
        <StyledArrowUp />
      </Button>
      <Button onClick={onBottomClick}>
        <StyledArrowDown />
      </Button>
      <Button onClick={onChatClick}>
        <StyledComment />
      </Button>
    </RemoteContainer>
  );
};

export default RemoteControl;

const RemoteContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: black;
  border: 1px solid #aaa;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${theme.mainColor};
    color: white;

    svg {
      color: white;
    }
  }
`;

const StyledArrowUp = styled(FaArrowUp)`
  color: #666;
`;

const StyledArrowDown = styled(FaArrowDown)`
  color: #666;
`;

const StyledComment = styled(FaComment)`
  color: #666;
`;
