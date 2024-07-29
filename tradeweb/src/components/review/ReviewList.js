import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Box, Typography, Rating } from '@mui/material';

const ReviewList = () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    const [postsPerPage, setPostsPerPage] = useState(8); // 한 페이지에 8개의 상품을 보여준다
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [reviewsData, setReviewsData] = useState([]);
    const [averageReviewRating, setAverageRating] = useState(0.0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const apiUrl = `${process.env.REACT_APP_API_URL}review/seller/${userId}?page=${currentPage}&size=${postsPerPage}&sort=desc`;
                const response = await axios.get(apiUrl, {
                    headers: {
                        'Content-Type': "multipart/form-data",
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const fetchedReviews = response.data.products;
                setReviewsData(fetchedReviews); // 실제 리뷰 데이터로 업데이트

                // 평균 평점 계산
                if (fetchedReviews.length > 0) {
                    const avgRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0) / fetchedReviews.length;
                    setAverageRating(avgRating);
                } else {
                    setAverageRating(0);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews(); // 비동기 함수 호출
    }, [userId, currentPage, postsPerPage, token]);

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                리뷰 목록
            </Typography>
            <AverageRatingText>평균 평점: {averageReviewRating.toFixed(1)} / 5</AverageRatingText>
            {reviewsData.map((review) => (
                <ReviewCard key={review.id}>
                    <UserAvatar src={review.reviewerProfileImageUrl} alt={review.userName} />
                    <ReviewContent>
                        <Header>
                            <Date>{review.reviewDate}</Date>
                        </Header>
                        <Rating value={review.rating} readOnly size="small" />
                        <ReviewText>{review.reviewTitle}</ReviewText>
                    </ReviewContent>
                </ReviewCard>
            ))}
        </Container>
    );
};

export default ReviewList;

const Container = styled(Box)`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;

const ReviewCard = styled(Box)`
    display: flex;
    align-items: flex-start;
    padding: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 16px;
    background-color: #ffffff;
`;

const UserAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 16px;
`;

const ReviewContent = styled(Box)`
    flex: 1;
`;

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`;

const UserName = styled(Typography)`
    font-weight: bold;
`;

const Date = styled(Typography)`
    color: #757575;
    font-size: 14px;
`;

const ReviewText = styled(Typography)`
    margin-top: 8px;
    font-size: 16px;
    color: #333333;
`;

// 추가된 AverageText 컴포넌트
const AverageRatingText = styled(Typography)`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333333;
`;
