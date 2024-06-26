import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { theme } from "../../styles/theme";
import { FaAngleLeft, FaAngleRight, FaShoppingCart } from "react-icons/fa";
import MessageTime from "./MessageTime";

const ChatList = ({ visible, onClose, productName }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isRoomListMinimized, setIsRoomListMinimized] = useState(false);
  const [currentView, setCurrentView] = useState("buyer");
  const [lastMessages, setLastMessages] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 상태 추가
  const chatRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const socket = useRef(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("accessToken");

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    fetchMessages(room.chatRoomid);
  };

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

  const handleSendMessage = () => {
    if (inputValue.trim() && selectedRoom) {
      const newMessage = {
        message: inputValue,
        messageType: "TEXT",
        chatRoomId: selectedRoom.chatRoomid,
      };

      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.send(JSON.stringify(newMessage));
        console.log(`Sent message: ${newMessage.message}`); // 메시지 전송 로그 추가
        setInputValue(""); // 메시지 입력값 초기화

        setLastMessages((prevLastMessages) => ({
          ...prevLastMessages,
          [selectedRoom.chatRoomid]: newMessage.message,
        }));
      } else {
        console.error(
          "WebSocket is not open or not initialized. Current state:",
          socket.current
            ? socket.current.readyState
            : "WebSocket instance is not defined"
        );
      }
    }
  };

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
        const latestMessages = response.data.reduce((acc, room) => {
          acc[room.chatRoomid] = room.latestMessage;
          return acc;
        }, {});
        setLastMessages(latestMessages);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };

    fetchRooms();
  }, [token, visible]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop =
          chatMessagesRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  const sortMessagesByTime = (messages) => {
    return messages.sort((a, b) => new Date(a.sentTime) - new Date(b.sentTime));
  };

  const filteredRooms = rooms.filter((room) => {
    if (currentView === "buyer") {
      return room.buyerId === parseInt(userId);
    } else if (currentView === "seller") {
      return room.sellerId === parseInt(userId);
    }
    return false;
  });

  const BuyButtonClick = () => {
    setIsModalVisible(true);
    localStorage.setItem("productId", selectedRoom.productId);
  };

  const confirmPurchase = async () => {
    setIsModalVisible(false);

    const productId = selectedRoom ? selectedRoom.productId : null;

    if (!productId) {
      console.error("Product ID is not available.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}purchase`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Purchase response:", response.data);
      sendPurchaseCompleteMessage();
    } catch (error) {
      console.error("Failed to complete purchase:", error);
    }
  };

  const cancelPurchase = () => {
    setIsModalVisible(false);
  };

  const sendPurchaseCompleteMessage = () => {
    if (selectedRoom) {
      const purchaseMessage = {
        senderId: parseInt(userId),
        message: "구매가 완료되었습니다.",
        messageType: "TEXT",
        chatRoomId: selectedRoom.chatRoomid,
      };

      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.send(JSON.stringify(purchaseMessage));
      } else {
        console.error(
          "WebSocket is not open or not initialized. Current state:",
          socket.current
            ? socket.current.readyState
            : "WebSocket instance is not defined"
        );
      }
    }
  };

  const ToggleButtonClick = () => {
    setIsRoomListMinimized(!isRoomListMinimized);
  };

  return (
    <ChatContainer visible={visible} ref={chatRef}>
      <RoomListWrapper isMinimized={isRoomListMinimized}>
        <ChatListHeader>
          <ToggleViewButton
            onClick={() =>
              setCurrentView(currentView === "buyer" ? "seller" : "buyer")
            }
          >
            {currentView === "buyer" ? "구매" : "판매"}
          </ToggleViewButton>
        </ChatListHeader>
        <RoomList>
          {filteredRooms.map((room, index) => (
            <RoomItem
              key={index}
              onClick={() => handleRoomClick(room)}
              isSelected={selectedRoom === room}
              isMinimized={isRoomListMinimized}
            >
              <img
                src={
                  currentView === "buyer" ? room.sellerImgUrl : room.buyerImgUrl
                }
                alt={" "}
              />
              {!isRoomListMinimized ? (
                <div>
                  <RoomName>
                    {currentView === "buyer"
                      ? room.productName
                      : room.buyerNickname}
                  </RoomName>
                  <LastMessage>{lastMessages[room.chatRoomid]}</LastMessage>
                </div>
              ) : (
                <div>
                  <RoomName>
                    {currentView === "buyer"
                      ? room.productName
                      : room.buyerNickname}
                  </RoomName>
                </div>
              )}
            </RoomItem>
          ))}
          <ToggleButton
            onClick={ToggleButtonClick}
            isMinimized={isRoomListMinimized}
          >
            {isRoomListMinimized ? <FaAngleRight /> : <FaAngleLeft />}
          </ToggleButton>
        </RoomList>
      </RoomListWrapper>
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
                          ? selectedRoom.sellerImgUrl
                          : selectedRoom.buyerImgUrl
                      }
                      alt={
                        currentView === "buyer"
                          ? selectedRoom.sellerImgUrl
                          : selectedRoom.buyerImgUrl
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
              <div>메시지가 없습니다</div>
            )
          ) : (
            <div>메시지가 없습니다</div>
          )}
        </ChatMessages>

        {selectedRoom && (
          <ChatInputContainer>
            <IconButton onClick={BuyButtonClick}>
              <FaShoppingCart />
            </IconButton>
            <ChatInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="메시지를 입력하세요..."
            />
          </ChatInputContainer>
        )}
      </ChatBox>
      {isModalVisible && (
        <Modal>
          <ModalContent>
            <ModalText>{productName}을(를) 구매하시겠습니까?</ModalText>

            <ButtonContainer>
              <ConfirmButton onClick={confirmPurchase}>확인</ConfirmButton>
              <CancelButton onClick={cancelPurchase}>취소</CancelButton>
            </ButtonContainer>
          </ModalContent>
        </Modal>
      )}
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

const RoomListWrapper = styled.div`
  min-width: ${(props) => (props.isMinimized ? "10%" : "50%")};
  width: auto;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
  overflow-wrap: break-word;
  word-break: break-all;
  overflow: auto;
`;

const RoomList = styled.div`
  border-right: 1px solid #ddd;
  overflow: auto;
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
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const IconButton = styled.button`
  height: 30px;
  background: transparent;
  border: none;
  color: #ddd;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #ccc;
  }
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ModalText = styled.p`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ConfirmButton = styled.button`
  background-color: ${theme.mainColor};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.mainColorDark};
  }
`;

const CancelButton = styled.button`
  background-color: grey;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkgrey;
  }
`;
