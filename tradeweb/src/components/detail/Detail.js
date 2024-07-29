import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import profile from "../../assets/profile.svg";
import rightarrow from "../../assets/rightarrow.svg";
import ChatList from "../chatlist/ChatList";
import { theme } from "../../styles/theme";
import { MdOutlineStar } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import ReviewForm from "../review/ReviewForm"; // 경로 수정

const Detail = () => {
  const loader = useRef(null);
  const [isChatVisible, setChatVisible] = useState(false);
  const [isReviewVisible, setReviewVisible] = useState(false); // ReviewForm 표시 여부를 관리하는 상태 추가
  const [isLiked, setLiked] = useState(false);
  const [data, setData] = useState(null);
  const [hasBuyUserId, setHasBuyUserId] = useState(false);

  const { productId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const buyUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}likes/product/${productId}?page=1&size=10&sort=asc`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const hasUserId = response.data.products.some(
          (product) => product.userId === parseInt(buyUserId)
        );

        setHasBuyUserId(hasUserId);
        setLiked(hasUserId);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  const ChatbuttonOnClick = async () => {
    localStorage.setItem("productId", productId);

    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}chat/rooms`;

      const response = await axios.post(
        apiUrl,
        {
          productId: productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChatVisible(!isChatVisible);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const userInfoClick = () => {
    // ReviewForm의 표시 상태를 토글합니다
    setReviewVisible((prev) => !prev);
  };

  const closeChat = () => {
    setChatVisible(false);
  };

  const handleProductLike = async () => {
    try {
      setLiked(!isLiked);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}likes`,
        { productId: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("상품 좋아요 오류 발생:", error);
    }
  };

  if (!data) {
    return <div>로딩 중...</div>;
  }

  const {
    imagePathUrl,
    thumbnailUrl,
    description,
    userNickName,
    productName,
    productLikes,
    productStars,
    productStarsCount,
    productOptions,
    totalLikes,
    totalRatings,
    price,
  } = data;

  const totalLikesPlus = totalLikes + 1;
  const totalLikesMinus = totalLikes - 1;

  return (
    <Wrapper>
      <Section>
        <Imagewrraper>
          {" "}
          <MainImage
            src={`${process.env.REACT_APP_IMAGE_URL}${data.thumbnailUrl}`}
            alt="Main Image"
          />
        </Imagewrraper>

        <Description dangerouslySetInnerHTML={{ __html: data.description }} />
        <div ref={loader}></div>
      </Section>
      <Section>
        <UserSection onClick={userInfoClick}>
          <UserImage src={profile} alt="User Image" />
          <UserName>{userNickName}</UserName>
          <img src={rightarrow} />
        </UserSection>
        <ProductInfo>
          <ProductTitle>{productName}</ProductTitle>
          <IconsWrapper>
            <Icon>
              <AiFillHeart color="red" /> {productLikes}
              {hasBuyUserId
                ? isLiked
                  ? totalLikes
                  : totalLikesMinus
                : isLiked
                ? totalLikesPlus
                : totalLikes}
            </Icon>
            <Icon>
              <MdOutlineStar color="#FFC83D" /> {productStars}
              {productStarsCount}
              {totalRatings}
            </Icon>
          </IconsWrapper>
          <Price>가격: {price}</Price>
          <Buttons>
            <HeartIcon onClick={() => handleProductLike(productId)}>
              {isLiked && hasBuyUserId ? (
                <AiFillHeart color="red" />
              ) : isLiked && !hasBuyUserId ? (
                <AiFillHeart color="red" />
              ) : !isLiked && hasBuyUserId ? (
                <AiOutlineHeart />
              ) : (
                <AiOutlineHeart />
              )}
            </HeartIcon>
            <Button onClick={ChatbuttonOnClick}>구매문의</Button>
          </Buttons>
        </ProductInfo>
      </Section>
      <ChatList
        visible={isChatVisible}
        onClose={closeChat}
        productName={productName}
      />

      {/* ReviewForm 컴포넌트를 조건부로 렌더링 */}
      {isReviewVisible && (
        <ReviewForm
          productId={productId}
          productName={productName}
          token={token}
          fetchReviews={() => console.log("리뷰를 가져오는 중")} // 이 부분은 fetchReviews를 구현하여 실제 리뷰를 불러올 때 사용합니다.
        />
      )}
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
  font-family: "Arial", sans-serif;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 30px;
  position: relative;
  width: 700px;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: contain;
`;

const Imagewrraper = styled.div`
  width: 700px;
  height: 500px;
  overflow: hidden;
`;

const Description = styled.p`
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;
  width: 700px;
  font-size: 18px;
  line-height: 1.6;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 50%;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const ProductInfo = styled.div`
  margin-top: 20px;
`;

const ProductTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const IconsWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  z-index: 2;
`;

const HeartIcon = styled.div`
  font-size: 25px;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 420px;
  height: 40px;
  background-color: ${theme.mainColor};
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin: 10px 0;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  &:hover {
    background-color: gray;
  }
`;