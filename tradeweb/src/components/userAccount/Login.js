import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Login = () => {
  const moveToHome = () => {};
  const moveToSignup = () => {};

  return (
    <Wrapper>
      <Title onClick={moveToHome}>super24</Title>
      <Form>
        <InputWrapper>
          <StyledInput type="text" placeholder="아이디(이메일)" name="email" />
          <StyledInput type="password" placeholder="비밀번호" name="password" />
        </InputWrapper>
        <SubmitButton type="submit">Login</SubmitButton>
        <SignupButton onClick={moveToSignup}>Sign up</SignupButton>
      </Form>
    </Wrapper>
  );
};

export default Login;

// 스타일드 컴포넌트 정의
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 58px;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 36px;
  height: 44px;
  cursor: pointer;
  color: ${theme.mainColor};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 465px;
  height: 50px;
  font-size: 18px;
  margin-bottom: 15px;
  padding: 0 15px;
  border: 1px solid ${theme.mainColor};
  border-radius: 10px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 100%;
  max-width: 465px;
  height: 45px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  background-color: ${theme.mainColor};
  border: 1px solid ${theme.mainColor};
  border-radius: 10px;
  margin-bottom: 15px;
  color: white;
`;

const SignupButton = styled.button`
  width: 100%;
  max-width: 465px;
  height: 45px;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  background-color: ${theme.subColor};
  border: 1px solid ${theme.subColor};
  color: white;
  border-radius: 10px;
`;
