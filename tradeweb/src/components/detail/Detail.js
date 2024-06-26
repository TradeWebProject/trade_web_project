import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import profile from "../../assets/profile.svg";
import rightarrow from "../../assets/rightarrow.svg";
import ChatList from "../chatlist/ChatList";
import { theme } from "../../styles/theme";
import { FaRegStar } from "react-icons/fa";
import { MdStar, MdOutlineStar } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";

const Detail = () => {
  const loader = useRef(null);
  const [isChatVisible, setChatVisible] = useState(false);
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
        console.error("Error fetching data:", error);
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
        console.error("Error fetching data:", error);
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
      // 요청이 실패했을 때의 처리
      console.error("Error:", error);
    }
  };

  const userInfoClick = () => {
    navigate(`/review/${productId}/${productName}`);
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
      console.error("Error liking product:", error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
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

const HeartIcon = styled.div`
  font-size: 25px;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  z-index: 2;
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
