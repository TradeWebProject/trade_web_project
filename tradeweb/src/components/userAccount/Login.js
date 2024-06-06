import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme"; // 외부 theme 파일 불러오기

const Login = () => {
  const moveToHome = () => {};
  const moveToSignup = () => {};

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Title onClick={moveToHome}>super24</Title>
        <Form>
          <InputWrapper>
            <StyledInput
              type="text"
              placeholder="아이디(이메일)"
              name="email"
            />
            <StyledInput
              type="password"
              placeholder="비밀번호"
              name="password"
            />
          </InputWrapper>
          <SubmitButton type="submit">Login</SubmitButton>
          <SignupButton onClick={moveToSignup}>Sign up</SignupButton>
        </Form>
      </Wrapper>
    </ThemeProvider>
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
  color: ${({ theme }) => theme.mainColor}; /* 테마에서 메인 컬러 가져오기 */
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
  border: 1px solid ${({ theme }) => theme.mainColor}; /* 테마에서 메인 컬러 가져오기 */
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
  background-color: ${({ theme }) =>
    theme.mainColor}; /* 테마에서 메인 컬러 가져오기 */
  border: 1px solid ${({ theme }) => theme.mainColor}; /* 테마에서 메인 컬러 가져오기 */
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
  background-color: ${({ theme }) =>
    theme.subColor}; /* 테마에서 서브 컬러 가져오기 */
  border: 1px solid ${({ theme }) => theme.subColor}; /* 테마에서 서브 컬러 가져오기 */
  color: white;
  border-radius: 10px;
`;
