// src/components/chatlist/ChatControl.js
import React, { useState } from "react";
import RemoteControl from "./RemoteControl";
import ChatList from "./ChatList";

const ChatControl = () => {
  const [isChatVisible, setChatVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const toggleChat = () => {
    setChatVisible(!isChatVisible);
  };

  const closeChat = () => {
    setChatVisible(false);
  };

  return (
    <div>
      <RemoteControl
        onTopClick={scrollToTop}
        onBottomClick={scrollToBottom}
        onChatClick={toggleChat}
      />
      <ChatList visible={isChatVisible} onClose={closeChat} />
    </div>
  );
};

export default ChatControl;
