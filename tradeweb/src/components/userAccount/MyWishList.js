import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Box } from "@mui/material";

const MyWishList = () => {
  const [responseData, setResponseData] = useState([]);
  const [showMore, setShowMore] = useState(false); // "더보기" 상태 관리
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function get() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}likes/user/${userId}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("응답 데이터:", response.data.products);
        setResponseData(response.data.products);
      } catch (error) {
        console.error("요청 실패:", error);
      }
    }
    if (userId && token) {
      get();
    }
  }, [userId, token]);

  const dislikeClick = (productId) => {
    console.log("disLikeProductId: ", productId);
    setResponseData(
      responseData.filter((product) => product.productId !== productId)
    );
    sendDisLikeProductId(productId);
  };

  const sendDisLikeProductId = async (productId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}likes`,
        {
          productId: productId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log("응답 데이터:", response.data.products);
      setResponseData(response.data.products);
    } catch (error) {
      console.error("요청 실패:", error);
    }
  };

  // "더보기" 버튼 클릭 시 상태 변경
  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Wrapper>
        <Container>
          <Title>찜목록</Title>
          <SearchResultList>
            {responseData.length > 0 ? (
              responseData
                .slice(0, showMore ? responseData.length : 8) // "더보기" 기능: 8개씩 보여줌
                .map((product) => (
                  <SearchItem key={product.productId}>
                    <ItemImageBox>
                      <ItemImage
                        src={`${process.env.REACT_APP_IMAGE_URL}${product.imageUrl}`}
                        alt={product.productName}
                      />
                    </ItemImageBox>
                    <ItemTitle>{product.productName}</ItemTitle>
                    <ItemPrice>
                      {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </ItemPrice>
                    <HeartIcon onClick={() => dislikeClick(product.productId)}>
                      ❤️
                    </HeartIcon>
                  </SearchItem>
                ))
            ) : (
              <h1>찜한 상품이 없습니다</h1>
            )}
          </SearchResultList>
          {/* "더보기" 버튼 */}
          {responseData.length >= 8 && ( // 총 아이템 수가 8개 이상일 경우에만 버튼을 보여줌
            <GetLikeMoreButton onClick={handleShowMoreClick}>
              {showMore ? "접기" : "더보기"}
            </GetLikeMoreButton>
          )}
        </Container>
      </Wrapper>
    </Box>
  );
};

export default MyWishList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const SearchResultList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열 */
  grid-template-rows: repeat(2, 1fr); /* 2행 */
  gap: 40px 20px; /* 행 간격: 40px, 열 간격: 20px */
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 화면이 작아지면 2열 */
    grid-template-rows: repeat(4, 1fr); /* 4행 */
  }
`;

const SearchItem = styled.div`
  border: 1px solid red;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const ItemImageBox = styled.div`
  width: 100%;
  height: 150px; /* 이미지 박스 높이 고정 */
  border-radius: 10px;
  overflow: hidden; /* 이미지가 박스를 넘지 않도록 설정 */
  margin-bottom: 10px;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율을 유지하며 박스에 맞춤 */
`;

const ItemTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  margin-bottom: 5px;
`;

const ItemPrice = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const HeartIcon = styled.div`
  margin-right: 5px;
  cursor: pointer;
  font-size: 20px;
  color: #e74c3c;
`;

const GetLikeMoreButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const Pagination = styled.div``;

const PageButton = styled.button`
  width: 35px;
  height: 35px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin: 5px;
`;

const InterestsWrapper = styled.div`
  width: 644px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Interest = styled.div`
  width: 50px;
  height: 20px;
  border-radius: 40px;
  background-color: white;
  color: black;
  border: 1px solid #d1d4d8;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
`;
