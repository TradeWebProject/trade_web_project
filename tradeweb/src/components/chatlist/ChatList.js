import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const ChatList = ({ visible, onClose }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms] = useState(["Room 1", "Room 2", "Room 3"]);
  const [messages, setMessages] = useState({});
  const [inputValue, setInputValue] = useState("");
  const chatRef = useRef(null);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && selectedRoom) {
      const newMessages = { ...messages };
      if (!newMessages[selectedRoom]) {
        newMessages[selectedRoom] = [];
      }
      newMessages[selectedRoom].push(inputValue);
      setMessages(newMessages);
      setInputValue("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, onClose]);

  return (
    <ChatContainer visible={visible} ref={chatRef}>
      <RoomList>
        <ChatHeader>
          Rooms
          <CloseButton onClick={onClose}>X</CloseButton>
        </ChatHeader>
        {rooms.map((room, index) => (
          <RoomItem key={index} onClick={() => handleRoomClick(room)}>
            {room}
          </RoomItem>
        ))}
      </RoomList>
      <ChatBox>
        <ChatHeader>{selectedRoom || "Select a Room"}</ChatHeader>
        <ChatMessages>
          {selectedRoom && messages[selectedRoom] ? (
            messages[selectedRoom].map((message, index) => (
              <div key={index}>{message}</div>
            ))
          ) : (
            <div>No messages</div>
          )}
        </ChatMessages>
        {selectedRoom && (
          <ChatInputContainer>
            <ChatInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
            />
          </ChatInputContainer>
        )}
      </ChatBox>
    </ChatContainer>
  );
};

export default ChatList;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 800px;
  height: 600px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.visible ? "flex" : "none")};
`;

const RoomList = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
`;

const RoomItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ChatBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${theme.mainColor};
  color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`;

const ChatMessages = styled.div`
  padding: 10px;
  height: calc(100% - 60px);
  overflow-y: auto;
`;

const ChatInputContainer = styled.div`
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
