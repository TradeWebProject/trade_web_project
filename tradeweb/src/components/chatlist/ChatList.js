import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import MessageTime from "./MessageTime";
import { theme } from "../../styles/theme";

const dummyData = [
  {
    name: "현서",
    photo: "https://via.placeholder.com/40",
    messages: [
      {
        sender: "me",
        text: "Hi, how are you?",
        time: new Date("2024-06-09T10:00:00").toISOString(),
      },
      {
        sender: "buyer",
        text: "I'm good, thanks!",
        time: new Date("2024-06-09T10:05:00").toISOString(),
      },
    ],
  },
  {
    name: "영호",
    photo: "https://via.placeholder.com/40",
    messages: [
      {
        sender: "me",
        text: "Hello!",
        time: new Date("2024-06-09T10:10:00").toISOString(),
      },
      {
        sender: "buyer",
        text: "Hi!",
        time: new Date("2024-06-09T10:15:00").toISOString(),
      },
    ],
  },
  {
    name: "Buyer 3",
    photo: "https://via.placeholder.com/40",
    messages: [],
  },
];

const sortMessagesByTime = (messages) => {
  return messages.sort((a, b) => {
    return new Date(a.time) - new Date(b.time);
  });
};

const ChatList = ({ visible, onClose }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms] = useState(dummyData);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatRef = useRef(null);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setMessages(sortMessagesByTime(room.messages));
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && selectedRoom) {
      const newMessage = {
        sender: "me",
        text: inputValue,
        time: new Date().toISOString(),
      };
      const newMessages = sortMessagesByTime([...messages, newMessage]);
      setMessages(newMessages);
      setInputValue("");
      selectedRoom.messages = newMessages;
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

  const chatMessagesRef = useRef(null);

  useEffect(() => {
    // 채팅 메시지가 업데이트될 때마다 스크롤을 가장 아래로 이동
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatContainer visible={visible} ref={chatRef}>
      <RoomList>
        <ChatHeader>
          Rooms
          <CloseButton onClick={onClose}>X</CloseButton>
        </ChatHeader>
        {rooms.map((room, index) => (
          <RoomItem key={index} onClick={() => handleRoomClick(room)}>
            <img src={room.photo} alt={room.name} />
            {room.name}
          </RoomItem>
        ))}
      </RoomList>
      <ChatBox>
        <ChatHeader>
          {selectedRoom ? selectedRoom.name : "Select a Room"}
        </ChatHeader>
        <ChatMessages ref={chatMessagesRef}>
          {selectedRoom ? (
            messages.length > 0 ? (
              messages.map((message, index) => (
                <Message isMe={message.sender === "me"}>
                  {message.sender === "me" && (
                    <MessageTimeStyle>
                      <MessageTime time={new Date(message.time)} />
                    </MessageTimeStyle>
                  )}
                  <MessageText isMe={message.sender === "me"}>
                    {message.text}
                  </MessageText>
                  {message.sender !== "me" && (
                    <MessageTimeStyle>
                      <MessageTime time={new Date(message.time)} />
                    </MessageTimeStyle>
                  )}
                </Message>
              ))
            ) : (
              <div>No messages</div>
            )
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
  z-index: 9000;
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
  overflow: hidden;
`;

const RoomList = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
`;

const RoomItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: #f1f1f1;
  }

  img {
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const ChatBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 70%;
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
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
  width: 95%;
`;

const Message = styled.div`
  display: flex;
  align-self: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
  margin-bottom: 15px;
`;

const MessageText = styled.span`
  padding: 7px;
  background-color: ${(props) => (props.isMe ? "#DCF8C6" : "#FFF")};
  border-radius: 10px;
  overflow-wrap: break-word;
  word-break: break-all;
  width: 100%;
`;

const MessageTimeStyle = styled.span`
  display: flex;
  justify-content: center;
  align-items: end;
  margin-bottom: 10px;
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
