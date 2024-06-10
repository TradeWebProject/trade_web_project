import React from "react";
import styled from "styled-components";
import SellerInfo from "./SellerInfo";
import { theme } from "../../styles/theme";

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
  const averageRating = getAverageRating(reviews);
  const totalReviews = reviews.length;

  return (
    <Wrapper>
      <SellerContainer>
        <SellerInfo />
      </SellerContainer>
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
    </Wrapper>
  );
};

export default Review;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const SellerContainer = styled.div`
  width: 250px;
`;
const ReviewContainer = styled.div`
  width: 800px;
  margin-top: 170px;
  padding: 20px;
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
