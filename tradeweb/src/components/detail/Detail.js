import React, { useState } from "react";
import styled from "styled-components";
import DropdownOptions from "../common/DropdownOptions";
import heartIcon from "../../assets/heart.svg";

const Detail = () => {
  // 임의의 데이터 정의
  const data = {
    image: "https://via.placeholder.com/700x448",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.",
    userImage: "https://via.placeholder.com/30",
    userName: "아이머그컵",
    productTitle: "🔥커스텀 일러스트 자수 커플 반팔티 티셔츠",
    productLikes: 271,
    productStars: 4.5,
    productStarsCount: 12,
    productOptions: ["S", "M", "L", "XL"],
  };

  // 데이터 추출
  const {
    image,
    description,
    userImage,
    userName,
    productTitle,
    productLikes,
    productStars,
    productStarsCount,
    productOptions,
  } = data;

  // 옵션 선택 시
  const handleOptionSelect = (option) => {
    console.log(option);
  };

  return (
    <Wrapper>
      <Section>
        <MainImage src={image} alt="Main Image" />
        <Description>{description}</Description>
        <Buttons>
          <HeartIcon src={heartIcon} alt="Heart Icon" />
          <Button>문의하기</Button>
        </Buttons>
      </Section>
      <Section>
        <UserSection>
          <UserImage src={userImage} alt="User Image" />
          <UserName>{userName}</UserName>
        </UserSection>
        <ProductInfo>
          <ProductTitle>{productTitle}</ProductTitle>

          <IconsWrapper>
            <Icon>❤️ {productLikes}</Icon>
            <Icon>
              ⭐ {productStars}({productStarsCount})
            </Icon>
          </IconsWrapper>
          <DropdownOptions
            options={productOptions}
            title="옵션 선택"
            onSelect={handleOptionSelect}
          />
        </ProductInfo>
      </Section>
    </Wrapper>
  );
};

export default Detail;

const Wrapper = styled.div`
  display: flex;
  margin-top: 100px;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  margin-top: 130px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 30px;
  position: relative;
`;

const MainImage = styled.img`
  width: 700px;
  height: 448px;
`;

const Description = styled.p`
  /* 상세 설명 스타일링 */
  width: 700px;
`;

const UserSection = styled.div`
  /* 사용자 정보 섹션 스타일링 */
`;

const UserImage = styled.img`
  /* 사용자 이미지 스타일링 */
  width: 100%;
  max-width: 30px;
  height: auto;
`;

const UserName = styled.span`
  /* 사용자 이름 스타일링 */
`;

const ProductInfo = styled.div`
  /* 상품 정보 섹션 스타일링 */
`;

const ProductTitle = styled.h2`
  /* 상품 타이틀 스타일링 */
`;

const IconsWrapper = styled.div`
  /* 아이콘들을 감싸는 스타일 */
`;

const Icon = styled.span`
  /* 아이콘 스타일 */
  margin-right: 5px;
`;
const HeartIcon = styled.img`
  /* 아이콘 스타일 */
  width: 30px;
  margin-right: 6px;
  cursor: pointer;
`;

const Buttons = styled.div`
  /* 버튼 스타일링 */
  position: absolute;
  bottom: 0px;
  right: -521px;
  display: flex;
  align-items: center;
  z-index: 2;
`;

const Button = styled.button`
  /* 버튼 스타일링 */
  width: 430px;
  height: 54px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px 0;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;
