import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { theme } from "../../styles/theme";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import MessageTime from "./MessageTime";

const ChatList = ({ visible, onClose }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isRoomListMinimized, setIsRoomListMinimized] = useState(false);
  const [currentView, setCurrentView] = useState("buyer");
  const [lastMessages, setLastMessages] = useState({});
  const chatRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const socket = useRef(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("accessToken");

  // 방 클릭 시 메시지 가져오기
  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    fetchMessages(room.chatRoomid);
  };

  // 해당 방의 메시지 가져오기
  const fetchMessages = async (roomId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}chat/messages?chatRoomId=${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(sortMessagesByTime(response.data));
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // WebSocket 연결 및 메시지 처리
  useEffect(() => {
    if (selectedRoom) {
      const socketUrl = `${process.env.REACT_APP_CHAT_URL}chat?chatRoomId=${selectedRoom.chatRoomid}&token=${token}`;
      socket.current = new WebSocket(socketUrl);

      socket.current.onopen = () => {
        console.log("WebSocket 연결 성공");
      };

      socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
        setLastMessages((prevLastMessages) => ({
          ...prevLastMessages,
          [selectedRoom.chatRoomid]: message.message,
        }));
      };

      socket.current.onerror = (error) => {
        console.error("WebSocket 에러 발생:", error);
      };

      socket.current.onclose = () => {
        console.log("WebSocket 연결 종료");
      };

      return () => {
        socket.current.close();
      };
    }
  }, [selectedRoom]);

  // 메시지 전송 함수
  const handleSendMessage = () => {
    if (inputValue.trim() && selectedRoom) {
      const newMessage = {
        messageContent: inputValue,
        messageType: "TEXT",
        chatRoomId: selectedRoom.chatRoomid, // 메시지에 방 정보 추가
      };

      // 웹 소켓을 통해 메시지 전송
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.send(JSON.stringify(newMessage));
      } else {
        console.error(
          "WebSocket is not open or not initialized. Current state:",
          socket.current
            ? socket.current.readyState
            : "WebSocket instance is not defined"
        );
      }
      // 입력값 초기화
      setInputValue("");

      // Update last message
      setLastMessages((prevLastMessages) => ({
        ...prevLastMessages,
        [selectedRoom.chatRoomid]: newMessage.messageContent,
      }));
    }
  };

  // 방 목록 가져오기
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}chat/rooms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRooms(response.data);
        const latestMessages = response.data.reduce((acc, room, index) => {
          acc[room.chatRoomid] = room.latestMessage;
          return acc;
        }, {});
        setLastMessages(latestMessages);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };

    fetchRooms();
  }, [token]);

  // 채팅 메시지 창 자동 스크롤
  useEffect(() => {
    const scrollToBottom = () => {
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop =
          chatMessagesRef.current.scrollHeight;
      }
    };

    // 메시지 업데이트 후에 스크롤 처리
    scrollToBottom();
  }, [messages]);

  // 메시지 시간별 정렬
  const sortMessagesByTime = (messages) => {
    return messages.sort((a, b) => new Date(a.sentTime) - new Date(b.sentTime));
  };

  // 필터된 방 목록 설정
  const filteredRooms = rooms.filter((room) => {
    if (currentView === "buyer") {
      return room.buyerId === parseInt(userId);
    } else if (currentView === "seller") {
      return room.sellerId === parseInt(userId);
    }
    return false;
  });

  return (
    <ChatContainer visible={visible} ref={chatRef}>
      <RoomList isMinimized={isRoomListMinimized}>
        <ChatListHeader>
          <ToggleViewButton
            onClick={() =>
              setCurrentView(currentView === "buyer" ? "seller" : "buyer")
            }
          >
            {currentView === "buyer" ? "판매" : "구매"}
          </ToggleViewButton>
        </ChatListHeader>

        {filteredRooms.map((room, index) => (
          <RoomItem
            key={index}
            onClick={() => handleRoomClick(room)}
            isSelected={selectedRoom === room}
            isMinimized={isRoomListMinimized}
          >
            <img
              src={currentView === "buyer" ? room.buyerPhoto : room.buyerPhoto}
              alt={" "}
            />
            {!isRoomListMinimized ? (
              <div>
                <RoomName>
                  {currentView === "buyer"
                    ? room.buyerNickname
                    : room.sellerNickname}
                </RoomName>
                <LastMessage>{lastMessages[room.chatRoomid]}</LastMessage>
              </div>
            ) : (
              <div>
                <RoomName>
                  {currentView === "buyer"
                    ? room.buyerNickname
                    : room.sellerNickname}
                </RoomName>
              </div>
            )}
          </RoomItem>
        ))}
        <ToggleButton
          onClick={() => setIsRoomListMinimized(!isRoomListMinimized)}
          isMinimized={isRoomListMinimized}
        >
          {isRoomListMinimized ? <FaAngleRight /> : <FaAngleLeft />}
        </ToggleButton>
      </RoomList>

      <ChatBox>
        <ChatHeader>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ChatHeader>
        <ChatMessages ref={chatMessagesRef}>
          {selectedRoom ? (
            messages && messages.length > 0 ? (
              messages.map((message, index) => (
                <Message
                  key={index}
                  isMe={message.senderId === parseInt(userId)}
                >
                  {message.senderId !== parseInt(userId) && (
                    <SenderImage
                      src={
                        currentView === "buyer"
                          ? selectedRoom.sellerPhoto
                          : selectedRoom.buyerPhoto
                      }
                      alt={
                        currentView === "buyer"
                          ? selectedRoom.sellerNickname
                          : selectedRoom.buyerNickname
                      }
                    />
                  )}
                  <MessageTimeStyle>
                    <MessageTime time={new Date(message.sentTime)} />
                  </MessageTimeStyle>
                  <MessageText isMe={message.senderId === parseInt(userId)}>
                    {message.message}
                  </MessageText>
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
  width: 900px;
  height: 700px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.visible ? "flex" : "none")};
`;

const RoomList = styled.div`
  min-width: ${(props) => (props.isMinimized ? "10%" : "30%")};
  width: auto;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
  overflow-wrap: break-word;
  word-break: break-all;
`;

const RoomItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  background-color: ${(props) => (props.isSelected ? "#ddd" : "white")};

  &:hover {
    background-color: #f1f1f1;
  }

  img {
    border-radius: 50%;
  }
`;

const RoomName = styled.div`
  margin-right: 10px;
`;

const LastMessage = styled.div`
  font-size: 0.8em;
  color: gray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SenderImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 4px;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px;
  background-color: ${theme.mainColor};
  color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 25px;
`;

const ChatListHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${theme.mainColor};
  color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 25px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  height: 100%;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`;

const ChatMessages = styled.div`
  padding: 10px;
  height: 84%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
  width: 95%;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
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
  margin: 6px;
  margin-top: 15px;
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

const ToggleButton = styled.button`
  position: absolute;
  left: 0;
  top: 25px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #ddd;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #ccc;
  }
`;

const ToggleViewButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`;
