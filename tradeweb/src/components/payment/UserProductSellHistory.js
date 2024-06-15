import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BarChart } from '@mui/x-charts/BarChart';

const UserProductSellHistory = () => {
    const navigate = useNavigate();
    const [navigateUrl, setNavigateUrl] = useState("");

    const productNameOnClick = () => {
        setNavigateUrl("/product/management/detail");
        navigate(navigateUrl);
    };

    const reviewButtonOnClick = () => {
        navigate("/detail");
    };

    return (
        <>
            <ContentWrapper>
                <div>
                    <Container>
                        <Title>등록된 상품 목록</Title>
                        <Table>
                            <tr>
                                <TableTh>상품번호</TableTh>
                                <TableTh>상품사진</TableTh>
                                <TableTh>상품명</TableTh>
                                <TableTh>카테고리</TableTh>
                                <TableTh>상품상태</TableTh>
                                <TableTh>댓글 조회</TableTh>
                            </tr>
                            <tr>
                                <TableTd>1</TableTd>
                                <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                                <TableTd><a href="/product/management/detail/26" onClick={productNameOnClick}>아디다스 슬리퍼</a></TableTd>
                                <TableTd>의류</TableTd>
                                <TableTd>새 생품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            <tr>
                                <TableTd>2</TableTd>
                                <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                                <TableTd><a href="/product/management/detail/26" onClick={productNameOnClick}>나이키 신발</a></TableTd>
                                <TableTd>의류</TableTd>
                                <TableTd>중고 상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            <tr>
                                <TableTd>3</TableTd>
                                <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                                <TableTd><a href="/product/management/detail/26" onClick={productNameOnClick}>아디다스 반팔티</a></TableTd>
                                <TableTd>의류</TableTd>
                                <TableTd>새상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            <tr>
                                <TableTd>4</TableTd>
                                <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                                <TableTd><a href="/product/management/detail/26" onClick={productNameOnClick}>갤럭시 탭s7</a></TableTd>
                                <TableTd>가전</TableTd>
                                <TableTd>중고 상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            <tr>
                                <TableTd>5</TableTd>
                                <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                                <TableTd><a href="/product/management/detail/26" onClick={productNameOnClick}>애플워치</a></TableTd>
                                <TableTd>가전</TableTd>
                                <TableTd>중고상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            <tr>
                                <TableTd>6</TableTd>
                                <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                                <TableTd><a href="/product/management/detail/26" onClick={productNameOnClick}>청바지</a></TableTd>
                                <TableTd>의류</TableTd>
                                <TableTd>새상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            <tr>
                                <TableTd>7</TableTd>
                                <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                                <TableTd><a href="/product/management/detail/26" onClick={productNameOnClick}>긴팔 티셔츠</a></TableTd>
                                <TableTd>의류</TableTd>
                                <TableTd>새상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            <tr>
                                <TableTd>8</TableTd>
                                <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                                <TableTd><a href="/product/management/detail/26" onClick={productNameOnClick}>아이패드</a></TableTd>
                                <TableTd>가전 제품</TableTd>
                                <TableTd>중고 상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            <tr>
                                <TableTd>9</TableTd>
                                <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                                <TableTd><a href="/product/management/detail/26" onClick={productNameOnClick}>모니터</a></TableTd>
                                <TableTd>가전 제품</TableTd>
                                <TableTd>새상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            <tr>
                                <TableTd>10</TableTd>
                                <TableTd><img src="https://via.placeholder.com/200x200"/></TableTd>
                                <TableTd><a href="/product/management/detail/26" onClick={productNameOnClick}>반바지</a></TableTd>
                                <TableTd>의류</TableTd>
                                <TableTd>중고상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
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
                        <Title>판매완료된 상품 목록</Title>
                        <Table>
                            <tr>
                                <TableTh>상품번호</TableTh>
                                <TableTh>상품명</TableTh>
                                <TableTh>카테고리</TableTh>
                                <TableTh>재고수량</TableTh>
                                <TableTh>상품상태</TableTh>
                                <TableTh>댓글 조회</TableTh>
                            </tr>
                            
                            <tr>
                                <TableTd>2</TableTd>
                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>나이키 신발</a></TableTd>
                                <TableTd>의류</TableTd>
                                <TableTd>0 (재고 없음)</TableTd>
                                <TableTd>중고 상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            
                            <tr>
                                <TableTd>4</TableTd>
                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>갤럭시 탭s7</a></TableTd>
                                <TableTd>가전</TableTd>
                                <TableTd>0 (재고 없음)</TableTd>
                                <TableTd>중고 상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            <tr>
                                <TableTd>5</TableTd>
                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>애플워치</a></TableTd>
                                <TableTd>가전</TableTd>
                                <TableTd>0 (재고 없음)</TableTd>
                                <TableTd>중고상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            
                            
                            <tr>
                                <TableTd>8</TableTd>
                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>아이패드</a></TableTd>
                                <TableTd>가전 제품</TableTd>
                                <TableTd>0 (재고 없음)</TableTd>
                                <TableTd>중고 상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            <tr>
                                <TableTd>9</TableTd>
                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>모니터</a></TableTd>
                                <TableTd>가전 제품</TableTd>
                                <TableTd>0 (재고 없음)</TableTd>
                                <TableTd>새상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                            </tr>
                            <tr>
                                <TableTd>10</TableTd>
                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>반바지</a></TableTd>
                                <TableTd>의류</TableTd>
                                <TableTd>0 (재고 없음)</TableTd>
                                <TableTd>중고상품</TableTd>
                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
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
                    <Title>상품판매 현황</Title>
                    <div>
                    <BarChart
                        xAxis={[
                            {
                            id: 'barCategories',
                            data: ['bar A', 'bar B', 'bar C'],
                            scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                            data: [2, 5, 3],
                            },
                        ]}
                        width={500}
                        height={300}
                    />





                    </div>
                </div>
                
            </ContentWrapper>
        
        
        
        </>
    );
};

export default UserProductSellHistory;

const ContentWrapper = styled.div`
    width: 1230px;
    display: flex;
    justify-content: space-around;
`;

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