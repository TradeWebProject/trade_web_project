import React from 'react';
import styled from "styled-components";

const UserPayment = () => {
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
                <tr>
                    <TableTd>2024.06.08</TableTd>
                    <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                    <TableTd>아디다스 슬리퍼</TableTd>
                    <TableTd>43,000원</TableTd>
                    <TableTd>0000003</TableTd>
                    <TableTd>구매완료</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.06</TableTd>
                    <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                    <TableTd>나이키 신발</TableTd>
                    <TableTd>89,000원</TableTd>
                    <TableTd>0000002</TableTd>
                    <TableTd>구매완료</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.05</TableTd>
                    <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                    <TableTd>나이키 티셔츠</TableTd>
                    <TableTd>56,000원</TableTd>
                    <TableTd>0000001</TableTd>
                    <TableTd>구매완료</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.04</TableTd>
                    <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                    <TableTd>아디다스 슬리퍼2</TableTd>
                    <TableTd>43,000원</TableTd>
                    <TableTd>0000003</TableTd>
                    <TableTd>구매완료</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.03</TableTd>
                    <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                    <TableTd>나이키 신발2</TableTd>
                    <TableTd>89,000원</TableTd>
                    <TableTd>0000002</TableTd>
                    <TableTd>구매완료</TableTd>
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