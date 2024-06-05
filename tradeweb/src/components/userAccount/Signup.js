import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import InputField from "./InputField";

const Signup = () => {
  return (
    <Wrapper>
      <Title>super24</Title>
      <Info>회원정보를 입력해주세요</Info>
      <InputWrapper>
        <InputField placeholder="아이디(이메일)" />
        <InputField
          placeholder="비밀번호 ( 8자 이상 20자 이하 영문자 숫자 조합 )"
          type="password"
        />
        <InputField placeholder="비밀번호 확인" type="password" />
        <InputField placeholder="휴대폰 번호 ( - 포함) " />
        <InputField placeholder="주소" />
        <FileInfo>
          나를 나타내는 프로필 사진과 닉네임으로 등록하면 이웃들이 안심할 수
          있어요.
        </FileInfo>
        <FileInputWrapper>
          <ImageButton alt="파일 선택 버튼" />
        </FileInputWrapper>
        <InputNickname placeholder="닉네임" />
      </InputWrapper>
      <SubmitButton>가입하기</SubmitButton>
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
  margin: 58px;
  color: ${theme.mainColor};
`;

const Info = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 465px;
  text-align: left;
  color: ${theme.subColor};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 80px;
`;

const InputNickname = styled.input`
  width: 100%;
  max-width: 465px;
  height: 40px;
  text-indent: 12px;
  border: 1px solid ${theme.mainColor};
  border-radius: 10px;
  margin-bottom: 10px;
  &::placeholder {
    color: ${theme.subColor};
  }
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
  color: ${theme.subColor};
  margin: 11px 0 36px 0;
`;

const ImageButton = styled.img`
  width: 150px;
  height: 150px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-bottom: 43px;
  max-width: 465px;
  height: 45px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  background-color: ${theme.mainColor};
  color: white;
  border-radius: 10px;
  &:disabled {
    cursor: not-allowed;
  }
`;
