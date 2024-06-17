import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import SellerInfo from "./SellerInfo";
import { theme } from "../../styles/theme";
import { MdStar } from "react-icons/md";

const reviews = [
  {
    id: 1,
    userImage: "https://via.placeholder.com/50",
    userName: "John Doe",
    date: "2023-06-01",
    productName: "Product A",
    content: "This is a great product!",
    rating: 5,
  },
  {
    id: 2,
    userImage: "https://via.placeholder.com/50",
    userName: "Jane Smith",
    date: "2023-06-02",
    productName: "Product B",
    content: "Not bad, could be better.",
    rating: 3,
  },
  // 추가 리뷰 객체를 여기에 추가하세요
];

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

const Review = () => {
  const [isPurchased, setIsPurchased] = useState(true);
  const [reviewContent, setReviewContent] = useState("");
  const [listData, setListData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isClicked, setClicked] = useState([false, false, false, false, false]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const averageRating = getAverageRating(reviews);
  const totalReviews = reviews.length;

  const starScore = (index) => {
    let star = [...isClicked];
    for (let i = 0; i < 5; i++) {
      star[i] = i <= index;
    }
    setClicked(star);
  };

  const submitReview = () => {
    const starCount = isClicked.filter((clicked) => clicked).length;
    console.log(`Star count: ${starCount}`);
    console.log(`Review content: ${reviewContent}`);
  };

  const starRateRendering = (data) => {
    const result = [];
    for (let i = 0; i < data; i++) {
      result.push("⭐");
    }
    return result;
  };

  const array = [0, 1, 2, 3, 4];

  const reviewData = [
    // ... 기존 리뷰 데이터 ...
  ];

  const loadMore = useCallback(() => {
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;
    const newReviews = reviewData.slice(startIndex, endIndex);

    if (newReviews.length === 0) {
      setHasMore(false);
    } else {
      setListData((prev) => [...prev, ...newReviews]);
      setPage((prev) => prev + 1);
    }
  }, [page]);

  useEffect(() => {
    loadMore();
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
        <SellerInfo />
      </SellerContainer>
      <ReviewWrapper>
        {isPurchased ? (
          <ReviewWriteContainer>
            <ReviewIconWrapper>
              <div>별점을 선택해주세요.</div>
              <div>
                {array.map((el, index) => (
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
            <InputElement
              type="text"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="구매후기를 작성해주세요"
            />
            <RegisterButton onClick={submitReview}>후기 등록</RegisterButton>
          </ReviewWriteContainer>
        ) : (
          <ReviewWriteContainer>
            상품 구매후에 후기를 작성할 수 있습니다
          </ReviewWriteContainer>
        )}
        {listData.map((data, index) => (
          <ProfileContainer key={index}>
            <ReviewHeader>
              <img src={data.files} alt="profile" />
              <div>{data.nickName}</div>
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
                  <UserName>{review.userName}</UserName>
                  <ReviewDate>{review.date}</ReviewDate>
                  <ProductName>{review.productName}</ProductName>
                  <ReviewText>{review.content}</ReviewText>
                  <StarContainer>{renderStars(review.rating)}</StarContainer>
                </ReviewContent>
              </ReviewItem>
              <Divider />
            </React.Fragment>
          ))}
        </ReviewContainer>
      </ReviewWrapper>
    </Wrapper>
  );
};

export default Review;

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
