import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleToLogin = () => setIsLogin(true);
  const toggleToSignup = () => setIsLogin(false);

  return (
    <Wrapper>
      <Title>super24</Title>
      <Box>
        <TabWrapper>
          <TabButton onClick={toggleToLogin} active={isLogin}>
            로그인
          </TabButton>
          <TabButton onClick={toggleToSignup} active={!isLogin}>
            회원가입
          </TabButton>
        </TabWrapper>
        <Form>
          {isLogin ? (
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
              <SubmitButton type="submit">로그인</SubmitButton>
            </InputWrapper>
          ) : (
            <SignupWrapper>
              <InputWrapper>
                <StyledInput type="text" placeholder="아이디(이메일)" />
                <StyledInput
                  type="password"
                  placeholder="비밀번호 (8자 이상 20자 이하 영문자 숫자 조합)"
                />
                <StyledInput type="password" placeholder="비밀번호 확인" />
                <StyledInput type="text" placeholder="휴대폰 번호 ( - 포함)" />
                <StyledInput type="text" placeholder="주소" />
                <FileInfo>
                  나를 나타내는 프로필 사진과 닉네임으로 등록하세요.
                </FileInfo>
                <FileInputWrapper>
                  <ImageButton alt="파일 선택 버튼" />
                </FileInputWrapper>
                <InputNickname type="text" placeholder="닉네임" />
              </InputWrapper>
              <SubmitButton>가입하기</SubmitButton>
            </SignupWrapper>
          )}
        </Form>
      </Box>
    </Wrapper>
  );
};

export default LoginSignup;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 100px;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 36px;
  height: 44px;
  cursor: pointer;
  color: ${theme.mainColor};
  margin-bottom: 20px;
`;

const Box = styled.div`
  width: 100%;
  max-width: 500px;
  border: 1px solid ${theme.mainColor};
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const TabButton = styled.button`
  padding: 20px;
  flex: 1;
  padding: 10px 0;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: ${({ active }) => (active ? theme.mainColor : "white")};
  color: ${({ active }) => (active ? "white" : theme.mainColor)};
  border-bottom: ${({ active }) =>
    active ? `3px solid ${theme.mainColor}` : "none"};
  margin-bottom: -1px;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-bottom 0.3s ease;
  opacity: ${({ active }) => (active ? 1 : 0.7)};
  &:hover {
    opacity: 1;
  }
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
  margin: 0 15px;
`;

const StyledInput = styled.input`
  width: 450px;
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
  width: 450px;
  max-width: 465px;
  height: 50px;
  margin-bottom: 15px;
  padding: 0 15px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  background-color: ${theme.mainColor};
  border: 1px solid ${theme.mainColor};
  border-radius: 10px;
  margin-bottom: 15px;
  color: white;
`;

const SignupWrapper = styled.div`
  display: ${({ isLogin }) => (isLogin ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  width: 100%;
  opacity: ${({ isLogin }) => (isLogin ? 0 : 1)};
`;

const InputNickname = styled.input`
  width: 92%;
  max-width: 465px;
  height: 40px;
  font-size: 18px;
  text-indent: 12px;
  border: 1px solid ${theme.mainColor};
  border-radius: 10px;
  margin-bottom: 10px;
`;

const FileInputWrapper = styled.div`
  width: 100%;
  max-width: 465px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileInfo = styled.div`
  font-size: 13px;
  color: ${theme.mainColor};
  margin: 11px 0 36px 0;
`;

const ImageButton = styled.img`
  width: 150px;
  height: 150px;
  cursor: pointer;
`;
