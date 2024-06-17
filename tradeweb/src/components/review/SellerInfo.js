import React from "react";
import styled from "styled-components";

const SellerInfo = () => {
  // 판매자 정보
  const sellerInfo = {
    sellerImage: "https://via.placeholder.com/100", // 판매자 사진 URL
    sellerName: "Lee", // 판매자 닉네임
    productCount: 30, // 상품 수
    averageRating: 3, // 평균 별점
    ratedCount: 20, // 별점 받은 수
  };

  // 별점을 렌더링하는 함수
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i} filled={i < rating}>
          ★
        </Star>
      );
    }
    return stars;
  };

  return (
    <SellerWrapper>
      <SellerImage src={sellerInfo.sellerImage} alt={sellerInfo.sellerName} />
      <div>
        <SellerName>{sellerInfo.sellerName}</SellerName>
        <SellerRating>
          {renderStars(sellerInfo.averageRating)} ({sellerInfo.ratedCount})
        </SellerRating>
        <ProductCount>{sellerInfo.productCount} products</ProductCount>
      </div>
    </SellerWrapper>
  );
};

export default SellerInfo;

const SellerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 130px;
`;

const SellerImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
`;

const SellerName = styled.div`
  font-weight: bold;
`;

const SellerRating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const Star = styled.span`
  color: ${(props) => (props.filled ? "#f39c12" : "#ddd")};
`;

const ProductCount = styled.div`
  margin-top: 5px;
`;
