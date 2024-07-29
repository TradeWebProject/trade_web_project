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

                console.log("API 응답 데이터: ", response);
                console.log("API 응답 데이터: ", response.data.products);

                // 서버 응답 형식이 배열인지 확인
                if (Array.isArray(response.data)) {
                    setResponseData(response.data.products);
                } else if (response.data.data && Array.isArray(response.data.data)) {
                    // 만약 데이터가 { data: [...] } 형식이라면
                    setResponseData(response.data.data);
                } else {
                    console.error("배열이 아닌 데이터가 반환되었습니다: ", response.data);
                    setResponseData([]); // 안전하게 빈 배열로 초기화
                }

                for (let i = 0; i <= responseData.lengthl; i++) {
                    if (userId === responseData[i].userId) {
                        selledResponseData[i] = responseData[i];
                    }
                }

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
    }, [token, currentPage, postsPerPage]);

    // 상태 업데이트 확인
    useEffect(() => {
        console.log("업데이트된 responseData: ", responseData);
    }, [responseData]);

    const paginate = (currentPage) => setCurrentPage(currentPage);

    return (
        <>
            <Container>
                <Title>판매 내역</Title>
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
                        {selledResponseData && selledResponseData.length > 0 ? (
                            selledResponseData.map((item, index) => (
                                <tr key={index}>
                                    <TableTd><TableRowImage src={`${process.env.REACT_APP_IMAGE_URL}${item.imageUrl}`}/></TableTd>
                                     {/* <TableTd><TableRowImage src={`${item.imageUrl}`}/></TableTd> */}
                                    {/* <TableTd><TableRowImage src={item.imageUrl} alt="product" width={20}/></TableTd> */}
                                    <TableTd>{item.productName}</TableTd>
                                    <TableTd>{item.price}</TableTd>
                                    <TableTd>{item.sellerNickname}</TableTd>
                                </tr>
                            ))
                        ) : (
                        <tr>
                            <TableTd colSpan={4}>데이터가 없습니다.</TableTd>
                        </tr>
                        )}
                    </tbody>
                </Table>
                <Pagination totalPosts={responseData.length} postsPerPage={postsPerPage} setCurrentPage={currentPage} paginate={paginate} />
            </Container>
        </>
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
