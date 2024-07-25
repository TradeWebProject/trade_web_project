import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { unstable_createMuiStrictModeTheme } from '@mui/material';

const UserPayment = () => {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("accessToken");
    console.log("token: ", token);
    const userId = localStorage.getItem("userId");
    const [responseData, setResponseData] = useState(null);
    const apiUrl = `${process.env.REACT_APP_API_URL}urchases/user/${userId}`;
    console.log("apiUrl: ", apiUrl);


    // const fetchPurchaseProducts = async () => {
    //     setLoading(true);
    //     try {
    //         await axios.get(`${process.env.REACT_APP_API_URL}/purchases/user/${userId}`,
    //             {
    //                 headers: {
    //                     'Content-Type': "multipart/form-data",
    //                     'Authorization': `Bearer ${token}`,
    //                 },
    //                 params: {
    //                     "page": 1,
    //                     "size": 8,
    //                     "sort": "desc"
    //                 }
    //             }
    //         ).then(function (response) {
    //             const purchasesArray = response.data;
    //             setResponseData(purchasesArray);
    //             console.log("responseData: ", responseData);
    //         })
    //     } catch (error) {
    //         console.log("요청 실패: ", error);
    //     }
    // }

    useEffect(() => {
        async function get() {
            setLoading(true);
            try {
                await axios.get(apiUrl,
                    {
                        withCredentials: true, // Add this line if needed
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        params: {
                            "page": 1,
                            "size": 8,
                            "sort": "desc"
                        }
                    }
                ).then(function (response) {
                    const purchasesArray = response.data;
                    setResponseData(purchasesArray);
                    console.log("responseData: ", responseData);
                })
            } catch (error) {
                console.log("요청 실패: ", error);
                if (error.response) {
                    console.log('Error data:', error.response.data);
                    console.log('Error status:', error.response.status);
                    console.log('Error headers:', error.response.headers);
                }
            } finally {
                setLoading(false);
            }

        };
        get();
    }, [apiUrl, token])


    return (
        <>
            <Container>
                <Title>구매 내역</Title>
                <Table>
                <tr>
                    <TableTh>결제일</TableTh>
                    <TableTh>상품 이미지</TableTh>
                    <TableTh>상품명</TableTh>
                    <TableTh>금액</TableTh>
                    <TableTh>결제번호</TableTh>
                    <TableTh>구매상태</TableTh>
                </tr>
                </Table>
                <Pagination/>
            </Container>
        </>
    );
};

export default UserPayment;

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