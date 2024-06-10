import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MessageTime = ({ time }) => {
  const [lastMessageTime, setLastMessageTime] = useState(new Date()); // 초기값 설정

  useEffect(() => {
    // 이전 메시지의 시간이 현재 메시지와 같으면 시간을 표시하지 않음
    if (lastMessageTime && lastMessageTime.getTime() === time.getTime()) {
      return;
    }

    // 현재 메시지의 시간을 마지막 메시지의 시간으로 업데이트
    setLastMessageTime(time);

    // 시간을 업데이트하기 위해 매 초마다 타이머 설정
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, [time, lastMessageTime]);

  const tick = () => {
    // 매 초마다 현재 시간을 갱신하여 렌더링
    setLastMessageTime(new Date());
  };

  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const period = hours < 12 ? "오전" : "오후";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${period} ${formattedHours}:${formattedMinutes}`;
  };

  // 마지막 메시지의 시간만 표시
  return lastMessageTime ? (
    <TimeContainer>{formatTime(time)}</TimeContainer>
  ) : null;
};

export default MessageTime;

const TimeContainer = styled.div`
  color: #888;
  font-size: 0.8rem;
`;
