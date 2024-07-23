import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <ServiceArea>
        <FooterMenu>
          <Menubox>
            <MenuTitle>이용안내</MenuTitle>
            <MenuList>
              <MenuItem>이용 정책</MenuItem>
              <MenuItem>패널티 정책</MenuItem>
              <MenuItem>가이드 라인</MenuItem>
            </MenuList>
          </Menubox>
          <Menubox>
            <MenuTitle>고객지원</MenuTitle>
            <MenuList>
              <MenuItem>공지사항</MenuItem>
              <MenuItem>서비스 소개</MenuItem>
              <MenuItem>구매자 문의</MenuItem>
              <MenuItem>판매자 문의</MenuItem>
            </MenuList>
          </Menubox>
        </FooterMenu>
        <CustomerService>
          <ServiceTitle>고객센터 1588 - 1588</ServiceTitle>
          <ServiceTime>
            운영시간 평일 10:00 - 18:00 (토 · 일, 공휴일 휴무)
          </ServiceTime>
          <ServiceTime>점심시간 평일 12:00 - 13:00</ServiceTime>
          <ServiceNotice>1:1 문의하기는 앱에서만 가능합니다</ServiceNotice>
          <ServiceButton>자주 묻는 질문</ServiceButton>
        </CustomerService>
      </ServiceArea>
      {/* <InformationArea></InformationArea> */}
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  width: 1280px;
  background-color: #ffffff;
  margin-top: 1600px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ServiceArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 0 50px 0;
`;
const FooterMenu = styled.div`
  display: flex;
`;

const Menubox = styled.div`
  margin-right: 80px;
`;

const MenuTitle = styled.strong`
  font-size: 16px;
`;

const MenuList = styled.div`
  margin-top: 20px;
`;

const MenuItem = styled.div`
  margin-top: 20px;
  font-size: 12px;
  color: gray;
`;

const CustomerService = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 10px;
`;

const ServiceTitle = styled.strong`
  margin-bottom: 10px;
`;

const ServiceTime = styled.div`
  color: gray;
  font-size: 12px;
`;

const ServiceNotice = styled.div`
  font-size: 14px;
  margin: 15px 0px 15px 0px;
`;

const ServiceButton = styled.button`
  background-color: black;
  color: white;
  width: 130px;
  border: none;
  padding: 10px 5px 10px 5px;
`;

// const InformationArea = styled.div`
//   width: 100%;
//   height: 200px;
//   border-top: 1px solid rgba(0, 0, 0, 0.1);
// `;
