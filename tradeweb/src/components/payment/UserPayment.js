import React from 'react';
import styled from "styled-components";

const UserPayment = () => {
    return (
        <>
            <Container>
                <Title>결제내역</Title>
                <Table>
                <tr>
                    <TableTh>결제일</TableTh>
                    <TableTh>상품 이미지</TableTh>
                    <TableTh>상품명</TableTh>
                    <TableTh>결제금액</TableTh>
                    <TableTh>결제번호</TableTh>
                    <TableTh>결제상태</TableTh>
                </tr>
                <tr>
                    <TableTd>2024.06.08</TableTd>
                    <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                    <TableTd>아디다스 슬리퍼</TableTd>
                    <TableTd>43,000원</TableTd>
                    <TableTd>0000003</TableTd>
                    <TableTd>결제예정</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.06</TableTd>
                    <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                    <TableTd>나이키 신발</TableTd>
                    <TableTd>89,000원</TableTd>
                    <TableTd>0000002</TableTd>
                    <TableTd>결제완료</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.05</TableTd>
                    <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                    <TableTd>나이키 티셔츠</TableTd>
                    <TableTd>56,000원</TableTd>
                    <TableTd>0000001</TableTd>
                    <TableTd>결제완료</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.04</TableTd>
                    <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                    <TableTd>아디다스 슬리퍼2</TableTd>
                    <TableTd>43,000원</TableTd>
                    <TableTd>0000003</TableTd>
                    <TableTd>결제예정</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.03</TableTd>
                    <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                    <TableTd>나이키 신발2</TableTd>
                    <TableTd>89,000원</TableTd>
                    <TableTd>0000002</TableTd>
                    <TableTd>결제완료</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.02</TableTd>
                    <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                    <TableTd>나이키 티셔츠2</TableTd>
                    <TableTd>56,000원</TableTd>
                    <TableTd>0000001</TableTd>
                    <TableTd>결제완료</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.01</TableTd>
                    <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                    <TableTd>나이키 티셔츠3</TableTd>
                    <TableTd>56,000원</TableTd>
                    <TableTd>0000001</TableTd>
                    <TableTd>결제완료</TableTd>
                </tr>
                </Table>
                <Pagination class="pagination">
                    <PageButton>&laquo;</PageButton>
                    <PageButton>1</PageButton>
                    <PageButton>2</PageButton>
                    <PageButton>3</PageButton>
                    <PageButton>4</PageButton>
                    <PageButton>5</PageButton>
                    <PageButton>6</PageButton>
                    <PageButton>&raquo;</PageButton>
                </Pagination>

            </Container>
            <Container>
                <Title>내가 작성한 리뷰</Title>
                <Table>
                <tr>
                    <TableTh>리뷰 작성일</TableTh>
                    <TableTh>상품명</TableTh>
                    <TableTh>리뷰 내용</TableTh>
                    <TableTh>별점</TableTh>
                    <TableTh>결제날짜</TableTh>
                </tr>
                <tr>
                    <TableTd>2024.06.11</TableTd>
                    <TableTd>아디다스 슬리퍼</TableTd>
                    <TableTd> 신기 편해요...</TableTd>
                    <TableTd> 4</TableTd>
                    <TableTd>2024.06.08</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.10</TableTd>
                    <TableTd>나이키 신발</TableTd>
                    <TableTd>색이 예쁘고 발이 편해요...</TableTd>
                    <TableTd>5</TableTd>
                    <TableTd>2024.06.06</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.09</TableTd>
                    <TableTd>아디다스 슬리퍼</TableTd>
                    <TableTd> 신기 편해요...</TableTd>
                    <TableTd> 4</TableTd>
                    <TableTd>2024.06.05</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.08</TableTd>
                    <TableTd>나이키 신발</TableTd>
                    <TableTd>색이 예쁘고 발이 편해요...</TableTd>
                    <TableTd>5</TableTd>
                    <TableTd>2024.06.04</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.07</TableTd>
                    <TableTd>아디다스 슬리퍼</TableTd>
                    <TableTd> 신기 편해요...</TableTd>
                    <TableTd> 4</TableTd>
                    <TableTd>2024.06.03</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.06</TableTd>
                    <TableTd>나이키 신발</TableTd>
                    <TableTd>색이 예쁘고 발이 편해요...</TableTd>
                    <TableTd>5</TableTd>
                    <TableTd>2024.06.02</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.05</TableTd>
                    <TableTd>아디다스 슬리퍼</TableTd>
                    <TableTd> 신기 편해요...</TableTd>
                    <TableTd> 4</TableTd>
                    <TableTd>2024.06.01</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.04</TableTd>
                    <TableTd>나이키 신발</TableTd>
                    <TableTd>색이 예쁘고 발이 편해요...</TableTd>
                    <TableTd>5</TableTd>
                    <TableTd>2024.05.08</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.03</TableTd>
                    <TableTd>아디다스 슬리퍼</TableTd>
                    <TableTd> 신기 편해요...</TableTd>
                    <TableTd> 4</TableTd>
                    <TableTd>2024.05.07</TableTd>
                </tr>
                <tr>
                    <TableTd>2024.06.02</TableTd>
                    <TableTd>나이키 신발</TableTd>
                    <TableTd>색이 예쁘고 발이 편해요...</TableTd>
                    <TableTd>5</TableTd>
                    <TableTd>2024.05.06</TableTd>
                </tr>
                </Table>
                <Pagination class="pagination">
                    <PageButton>&laquo;</PageButton>
                    <PageButton>1</PageButton>
                    <PageButton>2</PageButton>
                    <PageButton>3</PageButton>
                    <PageButton>4</PageButton>
                    <PageButton>5</PageButton>
                    <PageButton>6</PageButton>
                    <PageButton>&raquo;</PageButton>
                </Pagination>
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
    // border: 1px solid red;
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