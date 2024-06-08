import React, { useState } from "react";
import styled from "styled-components";

const DropdownOptions = ({ options, title, onSelect }) => {
  // 옵션 선택 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // 옵션 선택 시
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    // 상위 컴포넌트로 옵션 선택 전달
    onSelect(option);
  };

  return (
    <CustomOptions>
      <SelectedOption onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || title}
      </SelectedOption>
      <OptionList isOpen={isOpen}>
        {options.map((option, index) => (
          <Option key={index} onClick={() => handleOptionSelect(option)}>
            {option}
          </Option>
        ))}
      </OptionList>
    </CustomOptions>
  );
};

export default DropdownOptions;

const CustomOptions = styled.div`
  position: relative;
  width: 100%;
  margin: 20px 4px 20px 0;
`;

const SelectedOption = styled.div`
  /* 선택된 옵션 스타일 */
  appearance: none; /* 기본 스타일 제거 */
  background-color: white;
  border: 1px solid #ccc;
  padding: 12px 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const OptionList = styled.ul`
  /* 옵션 목록 스타일 */
  position: absolute;
  top: 100%;
  left: 0;
  width: calc(100% - 2px);
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 10px 10px;
  padding: 0;
  margin: 0;
  list-style-type: none;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  max-height: ${({ isOpen }) => (isOpen ? "200px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;

  /* 상단 옵션에 대한 스타일 */
  > :first-child {
    border-top: none;
  }
`;

const Option = styled.li`
  /* 옵션 스타일 */
  padding: 12px 20px;
  border-top: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5; /* 호버 시 배경색 변경 */
  }
  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
