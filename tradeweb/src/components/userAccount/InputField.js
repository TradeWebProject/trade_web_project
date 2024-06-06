import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const InputField = ({
  iconSrc,
  placeholder,
  type = "text",
  value,
  name,
  onChange,
  error,
  errorMessage,
}) => (
  <Wrapper>
    <InputContainer error={error}>
      <IconWrapper>
        <Icon src={iconSrc} />
      </IconWrapper>
      <Input
        placeholder={placeholder}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        error={error}
      />
    </InputContainer>
    {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </Wrapper>
);

export default InputField;
const Wrapper = styled.div`
  margin-bottom: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 463px;
  ${({ error }) => error && `border-color:red;`}
`;

const IconWrapper = styled.div`
  width: 54px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.mainColor};
  border-right: 1px solid ${theme.subColor};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Input = styled.input`
  width: 465px;
  height: 56px;
  text-indent: 12px;
  border: 1px solid ${theme.mainColor};
  border-radius: 0 10px 10px 0;
  outline: none;
  &::placeholder {
    color: ${theme.subColor};
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  text-indent: 47px;
  padding-top: 5px;
  width: 465px;
  text-align: left;
  border-radius: 10px;
`;
