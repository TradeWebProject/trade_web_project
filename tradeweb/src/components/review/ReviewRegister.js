import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { MdStar } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";

const getAverageRating = (reviews) => {
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};

const renderStars = (rating) => {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2; // 소수점 첫째 자리에서 반올림
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(roundedRating)) {
      stars.push(
        <Star key={i} filled>
          ★
        </Star>
      );
    } else if (i < roundedRating) {
      stars.push(
        <Star key={i} halfFilled>
          ★
        </Star>
      );
    } else {
      stars.push(<Star key={i}>★</Star>);
    }
  }
  return stars;
};

const ReviewRegister = () => {
  const [isPurchased, setIsPurchased] = useState(true);
  const [reviewContent, setReviewContent] = useState("");
  const [listData, setListData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isClicked, setClicked] = useState([false, false, false, false, false]);
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const loader = useRef(null);

  const averageRating = getAverageRating([]);
  const totalReviews = reviews.length;
  const { productId, productName } = useParams();
  const token = localStorage.getItem("accessToken");
  const [sellerInfo, setSellerInfo] = useState({});

  // 상품에 대한 리뷰
  const fetchReviews = async () => {
    try {
      const reviewResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}reviews/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const reviews = reviewResponse.data;
      setReviews(reviews);
      console.log("reviews: " , reviews);

      const sellerId = reviews?.[0]?.sellerId;

      if (sellerId) {
        // 판매자에 대한 리뷰
        const sellerResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}reviews/seller/${sellerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const sellerData = sellerResponse.data;
        setSellerInfo({
          sellerImage: sellerData.sellerProfileImageUrl,
          sellerName: sellerData.sellerNickname,
          productCount: sellerData.totalSales,
          averageRating: sellerData.averageRating,
          ratedCount: sellerData.totalReviews,
        });
        console.log(sellerData);
      } else {
        console.warn("No sellerId found in reviews.");
      }
    } catch (error) {
      console.error("Error fetching reviews or seller data:", error);
    }
  };

  const starScore = (index) => {
    let star = [...isClicked];
    for (let i = 0; i < 5; i++) {
      star[i] = i <= index;
    }
    setClicked(star);
  };

  const submitReview = async () => {
    const rating = isClicked.filter((clicked) => clicked).length;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}reviews?productId=${productId}&reviewContent=${reviewContent}&rating=${rating}&title=${productName}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Review submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const starRateRendering = (data) => {
    const result = [];
    for (let i = 0; i < data; i++) {
      result.push("⭐");
    }
    return result;
  };

  const loadMore = useCallback(() => {
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;
    const newReviews = reviews.slice(startIndex, endIndex);

    if (newReviews.length === 0) {
      setHasMore(false);
    } else {
      setListData((prev) => [...prev, ...newReviews]);
      setPage((prev) => prev + 1);
    }
  }, [page, reviews, productId]);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (!hasMore) return;

    let currentLoader = loader.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore, hasMore]);

  return (
    <Wrapper>
      <SellerContainer>
        <SellerWrapper>
          <SellerImage
            src={sellerInfo.sellerImage}
            alt={sellerInfo.sellerName}
          />
          <div>
            <SellerName>{sellerInfo.sellerName}</SellerName>
            <SellerRating>
              {renderStars(sellerInfo.averageRating)} ({sellerInfo.ratedCount})
            </SellerRating>
            <ProductCount>{sellerInfo.productCount} products</ProductCount>
          </div>
        </SellerWrapper>
      </SellerContainer>
      <ReviewWrapper>
        {isPurchased ? (
          <ReviewWriteContainer>
            <ReviewIconWrapper>
              <div>별점을 선택해주세요.</div>
              <div>
                {[0, 1, 2, 3, 4].map((el, index) => (
                  <span key={index} onClick={() => starScore(index)}>
                    {isClicked[index] ? (
                      <MdStar color="#FFC83D" />
                    ) : (
                      <MdStar color="#ccc" />
                    )}
                  </span>
                ))}
              </div>
            </ReviewIconWrapper>
            <AverageText>
              {averageRating} / 5 <p>({totalReviews})</p>
            </AverageText>
            <StarAverage>{renderStars(parseFloat(averageRating))}</StarAverage>
            <InputElement
              type="text"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            />
            <RegisterButton onClick={submitReview}>후기 등록</RegisterButton>
          </ReviewWriteContainer>
        ) : (
          <ReviewWriteContainer>
            상품 구매후에 후기를 작성할 수 있습니다
          </ReviewWriteContainer>
        )}
        {reviews.map((data, index) => (
          <ProfileContainer key={index}>
            <ReviewHeader>
              {/* <img src={data.reviewerProfileImageUrl} alt="profile" /> */}
              <div>{data.reviewerNickname}</div>
              <div>{data.productName}</div>
              <div>{data.reviewContent}</div>
              <div>{data.date}</div>
            </ReviewHeader>
            <StarContainer>
              <Icon>{starRateRendering(data.clickedStarNum)}</Icon>
            </StarContainer>
            <div>{data.reviewContent}</div>
          </ProfileContainer>
        ))}

        <ReviewContainer>
          <Header>
            <AverageText>
              {averageRating} / 5 <p>({totalReviews})</p>
            </AverageText>
            <StarAverage>{renderStars(parseFloat(averageRating))}</StarAverage>
          </Header>
          <Divider />
          {reviews.map((review) => (
            <React.Fragment key={review.id}>
              <ReviewItem>
                <UserImage src={review.userImage} alt={review.userName} />
                <ReviewContent>
                  <StarContainer>{renderStars(review.rating)}</StarContainer>
                  <UserName>{review.userName}</UserName>
                  <ReviewDate>{review.date}</ReviewDate>
                  <ProductName>{review.reviewTitle}</ProductName>
                  <ReviewText>{review.reviewContent}</ReviewText>
                </ReviewContent>
              </ReviewItem>
              <Divider />
            </React.Fragment>
          ))}
        </ReviewContainer>
      </ReviewWrapper>
      <div ref={loader} />
    </Wrapper>
  );
};

export default ReviewRegister;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SellerContainer = styled.div`
  width: 250px;
`;

const ReviewContainer = styled.div`
  width: 700px;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  margin: 20px 0;
  border-top: 1px solid #ddd;
`;

const ReviewItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
`;

const UserImage = styled.img`
  border-radius: 50%;
  margin-right: 15px;
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const UserName = styled.h4`
  margin: 0;
`;

const ReviewDate = styled.span`
  font-size: 0.8em;
  color: #666;
`;

const ProductName = styled.h5`
  margin: 5px 0;
  font-weight: bold;
`;

const ReviewText = styled.p`
  margin: 5px 0;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarAverage = styled.div`
  display: flex;
  justify-content: center;
`;

const Star = styled.span`
  font-size: 1.2em;
  color: ${(props) => (props.filled || props.halfFilled ? "#f39c12" : "#ddd")};
  position: relative;
  display: inline-block;

  &::before {
    content: "★";
    position: absolute;
    left: 0;
    top: 0;
    width: ${(props) => (props.halfFilled ? "50%" : "0")};
    overflow: hidden;
    color: #f39c12;
  }
`;

const AverageText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: ${theme.mainColor};
  margin-left: 20px;
  margin-bottom: -20px;

  p {
    margin-left: 5px;
    font-size: 30px;
    color: #ddd;
  }
`;

const ReviewWrapper = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
`;

const ReviewWriteContainer = styled.div`
  max-width: 700px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin-top: 40px;
  gap: 10px;
`;

const ReviewIconWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ProfileContainer = styled.div`
  width: 700px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 10px;
  padding: 0 20px;
  gap: 10px;
  background-color: #f4f4f4;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  height: 50px;
  margin-top: 20px;
  gap: 10px;
`;

const InputElement = styled.input`
  width: 693px;
  height: 200px;
  border-radius: 10px;
`;

const RegisterButton = styled.button`
  width: 700px;
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

const Icon = styled.span`
  /* 아이콘 스타일 */
  width: 30px;
  font-size: 25px;
  margin-right: 5px;
  cursor: pointer;
`;

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

const ProductCount = styled.div`
  margin-top: 5px;
`;
