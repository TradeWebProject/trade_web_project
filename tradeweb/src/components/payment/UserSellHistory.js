import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

const UserSellHistory = () => {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("accessToken");
    console.log("token: ", token);
    const userId = localStorage.getItem("userId");
    console.log("userId: " , userId);
    const [responseData, setResponseData] = useState([]);
    const apiUrl = `${process.env.REACT_APP_API_URL}purchase/user/${userId}`;
    console.log("apiUrl: ", apiUrl);
  return (
    <>
        <Container>
                <Title>판매 내역</Title>
                <Table>
                <tr>
                    <TableTh>상품 이미지</TableTh>
                    <TableTh>상품명</TableTh>
                    <TableTh>금액</TableTh>
                    <TableTh>판매자 닉네임</TableTh>
                </tr>
                <tbody>
                        {responseData.map((data, index) => (
                            <tr key={index}>
                                <TableTd><img src={data.imageUrl} alt="product" /></TableTd>
                                <TableTd>{data.productName}</TableTd>
                                <TableTd>{data.price}</TableTd>
                                <TableTd>{data.sellerNickname}</TableTd>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Pagination/>
            </Container>
        </>
    )
}

export default UserSellHistory;

const Container = styled.div`
    width: 1230px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title  = styled.div`
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

const TableTd = styled.td`
    padding: 6px 15px;
    text-align: center;
`;

const Pagination = styled.div``;

const PageButton = styled.button`
    width: 35px;
    height: 35px;
    background-color: black;
    color: white;
    cursor: pointer;
`;