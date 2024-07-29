import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Pagination from "../pagination/Pagination";

const UserSellHistory = () => {
    const [loading, setLoading] = useState(false);
    const [postsPerPage, setPostsPerPage] = useState(8); // 한 페이지에 8개의 상품을 보여준다
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const [responseData, setResponseData] = useState([]); // 초기값을 빈 배열로 설정
    const [selledResponseData, setSellectResponseData] = useState([]);

    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_API_URL}purchase/user/${userId}?page=${currentPage}&size=${postsPerPage}&sort=desc`;

        async function get() {
            setLoading(true);
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        'Content-Type': "multipart/form-data",
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("API 응답 데이터: ", response.data.products);

                // 상태 업데이트
                setResponseData( response.data.products);

            } catch (error) {
                console.log("요청 실패: ", error);
                if (error.response) {
                    console.log('Error data:', error.response.data);
                    console.log('Error status:', error.response.status);
                    console.log('Error headers:', error.response.headers);
                } else {
                    console.error("기타 오류: ", error.message);
                }
            } finally {
                setLoading(false);
            }
        }

        get();
    }, [token, currentPage, postsPerPage, userId]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container>
            <Title>판매 완료된 상품</Title>
            <Table>
                <thead>
                    <tr>
                        <TableTh>상품 이미지</TableTh>
                        <TableTh>상품명</TableTh>
                        <TableTh>금액</TableTh>
                        <TableTh>판매자 닉네임</TableTh>
                    </tr>
                </thead>
                <tbody>
                    {responseData.map((data,index) => (
                        <tr key={index}>
                        <TableTd><ThumnailImage src={data.imageUrl} alt="product" /></TableTd>
                        <TableTd>{data.productName}</TableTd>
                        <TableTd>{data.price}</TableTd>
                        <TableTd>{data.sellerNickname}</TableTd>
                    </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination 
                totalPosts={selledResponseData.length} 
                postsPerPage={postsPerPage} 
                currentPage={currentPage} 
                paginate={paginate} 
            />
        </Container>
    );
}

export default UserSellHistory;

const Container = styled.div`
    width: 1230px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
`;

const Table = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    margin-bottom: 40px;
`;

const TableTh = styled.th`
    padding: 6px 15px;
    background: #42444e;
    color: #fff;
    text-align: center;
`;

const TableRowImage = styled.img`
    width: 200px;
    height: 200px;
`;

const TableTd = styled.td`
    padding: 6px 15px;
    text-align: center;
`;

const PageButton = styled.button`
    width: 35px;
    height: 35px;
    background-color: black;
    color: white;
    cursor: pointer;
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

const ThumnailImage = styled.img`
    width: 200px;
    height: 200px;
`;