import React from "react";
import styled from "styled-components";

const MessageTime = ({ time }) => {
  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const period = hours < 12 ? "오전" : "오후";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${period} ${formattedHours}:${formattedMinutes}`;
  };

  // 시간을 표시합니다.
  return <TimeContainer>{formatTime(new Date(time))}</TimeContainer>;
};

export default MessageTime;

const TimeContainer = styled.div`
  color: #888;
  width: 50px;
  font-size: 10px;
`;
