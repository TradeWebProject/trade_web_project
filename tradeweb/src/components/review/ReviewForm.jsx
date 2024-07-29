import React, { useState } from "react";
import styled from "styled-components";
import { MdStar } from "react-icons/md";
import axios from "axios";

const ReviewForm = ({ productId, productName, token, fetchReviews }) => {
  const [reviewContent, setReviewContent] = useState("");
  const [isClicked, setClicked] = useState([false, false, false, false, false]);

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
      fetchReviews(); // 리뷰 제출 후 목록 새로고침
      setReviewContent(""); // 입력 필드 초기화
      setClicked([false, false, false, false, false]); // 별점 초기화
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
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
      <InputElement
        type="text"
        placeholder="리뷰를 입력하세요..."
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
      />
      <RegisterButton onClick={submitReview}>후기 등록</RegisterButton>
    </ReviewWriteContainer>
  );
};

export default ReviewForm;

// Styled Components

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

const InputElement = styled.input`
  width: 693px;
  height: 200px;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 16px;
`;

const RegisterButton = styled.button`
  width: 700px;
  height: 54px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px 0;
  border: 1px solid #ddd;
  transition: background-color 0.3s;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;
