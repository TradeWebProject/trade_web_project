import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography, Rating } from '@mui/material';

// 가상의 리뷰 데이터
const reviews = [
    {
        id: 1,
        userName: 'John Doe',
        userAvatar: 'https://via.placeholder.com/40',
        rating: 4,
        reviewText: 'Great product! Really enjoyed using it. Would recommend to others.',
        date: '2024-07-20',
    },
    {
        id: 2,
        userName: 'Jane Smith',
        userAvatar: 'https://via.placeholder.com/40',
        rating: 5,
        reviewText: 'Amazing experience! The seller was very responsive and the product quality is top-notch.',
        date: '2024-07-22',
    },
    // 추가 리뷰들
];

const ReviewList = () => {
    // 평균 평점 계산
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                리뷰 목록
            </Typography>
            <AverageRatingText>평균 평점: {averageRating.toFixed(1)} / 5</AverageRatingText>
            {reviews.map((review) => (
                <ReviewCard key={review.id}>
                    <UserAvatar src={review.userAvatar} alt={review.userName} />
                    <ReviewContent>
                        <Header>
                            <UserName>{review.userName}</UserName>
                            <Date>{review.date}</Date>
                        </Header>
                        <Rating value={review.rating} readOnly size="small" />
                        <ReviewText>{review.reviewText}</ReviewText>
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
