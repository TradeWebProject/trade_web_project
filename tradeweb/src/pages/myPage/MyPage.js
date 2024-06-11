import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import {Box, Tab, Tabs, Button  } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

import profile from "../../assets/profile.svg";
import plus from "../../assets/plus.svg";
import Modal from '../../components/common/Modal/Modal';

const MyPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [navigateUrl, setNavigateUrl] = useState("");
    const [reviewList, setReviewList] = useState([]);

    const data = [
        {
          files: plus,
          title: "나이키 신발",
          price: 240000,
          description: "나이키 운동화 사이즈 300",
          productId: 1,
        },
        {
          files: plus,
          title: "아디다스 신발",
          price: 340000,
          description: "아디다스 삼선 슬리퍼 사이즈260",
          productId: 2,
        },
        {
          files: plus,
          title: "닥터마틴 로퍼",
          price: 270000,
          description: "닥터마틴 로퍼 사이즈 270",
          productId: 3,
        },
        {
          files: plus,
          title: "흰색 셔츠",
          price: 20000,
          description: "미개봉 흰색 셔츠",
          productId: 4,
        },
        {
            files: plus,
            title: "나이키 신발",
            price: 240000,
            description: "나이키 운동화 사이즈 300",
            productId: 1,
          },
          {
            files: plus,
            title: "아디다스 신발",
            price: 340000,
            description: "아디다스 삼선 슬리퍼 사이즈260",
            productId: 2,
          },
          {
            files: plus,
            title: "닥터마틴 로퍼",
            price: 270000,
            description: "닥터마틴 로퍼 사이즈 270",
            productId: 3,
          },
          {
            files: plus,
            title: "흰색 셔츠",
            price: 20000,
            description: "미개봉 흰색 셔츠",
            productId: 4,
          },
      ];


      const reviewData = [
            {
                files: profile,
                nickName: "nickname",
                starRate: 4,
                reviewContent: "색이 예쁘고 발이 편해요",
                date: "2024.06.08",
                productId: 2,
            },
            {
                files: profile,
                nickName: "nickname2",
                starRate: 5,
                reviewContent: "색이 예쁘고 발이 편해요",
                date: "2024.06.08",
                productId: 2,
            },
            {
                files: profile,
                nickName: "nickname3",
                starRate: 4,
                reviewContent: "색이 예쁘고 발이 편해요...",
                date: "2024.06.08",
                productId: 2,
            },
            {
                files: profile,
                nickName: "nickname4",
                starRate: 4,
                reviewContent: "색이 예쁘고 발이 편해요...",
                date: "2024.06.08",
                productId: 2,
            },
            {
                files: profile,
                nickName: "nickname5",
                starRate: 4,
                reviewContent: "색이 예쁘고 발이 편해요...",
                date: "2024.06.08",
                productId: 2,
            },
            {
                files: profile,
                nickName: "nickname6",
                starRate: 4,
                reviewContent: "색이 예쁘고 발이 편해요...",
                date: "2024.06.08",
                productId: 2,
            },
            {
                files: profile,
                nickName: "nickname7",
                starRate: 4,
                reviewContent: "색이 예쁘고 발이 편해요...",
                date: "2024.06.08",
                productId: 2,
            },
            {
                files: profile,
                nickName: "nickname8",
                starRate: 4,
                reviewContent: "색이 예쁘고 발이 편해요...",
                date: "2024.06.08",
                productId: 2,
            },
            {
                files: profile,
                nickName: "nickname9",
                starRate: 4,
                reviewContent: "색이 예쁘고 발이 편해요...",
                date: "2024.06.08",
                productId: 2,
            },
            {
                files: profile,
                nickName: "nickname10",
                starRate: 4,
                reviewContent: "색이 예쁘고 발이 편해요...",
                date: "2024.06.08",
                productId: 2,
            },
      ];

    const handleTabChange = (e, tabIndex) => {
        console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };

    const productAddPageButtonClick = () => {
        setNavigateUrl("/write");
        navigate(navigateUrl);

    }

    const productNameOnClick = () => {
        setNavigateUrl("/product/management/detail");
        navigate(navigateUrl);
    }

    const reviewButtonOnClick = () => {
        setReviewList(reviewData);
        navigate("/detail");
    }

    const closeModal = () => {
        setIsVisible(false);
    }

    const navigateToPage = () => {
        setNavigateUrl("/product/management/detail");
        navigate(navigateUrl);
    };

    return (
        <ContentLayout>
            <Wrapper>
                <Box sx={{display: 'flex', alignItems: 'flex-start', width: 1230}}>
                    <Tabs value={currentTabIndex} onChange={handleTabChange} variant="fullWidth">
                        <Tab style={{width: '140px'}} label='마이 프로필' />
                        <Tab label='구매 내역' />
                        <Tab label='판매 내역' />
                    </Tabs>
                </Box>
                {currentTabIndex === 0 && (
                    <Box sx={{ p: 3 }}>
                        <Container>
                            <Title>프로필</Title>
                            <ProfileContainer>
                                <img src={profile} alt="profile"/>
                                <div>Nickname</div>
                                <div>
                                    <ChangeImgButton>사진 변경</ChangeImgButton>
                                </div>
                            </ProfileContainer>
                            <InfoWrapper>
                                <div>이메일</div>
                                <InfoText>tkgksw@naver.com</InfoText>
                            </InfoWrapper>
                            <InfoWrapper>
                                <div>주소</div>
                                <InfoText>경기도 인천시 연수구</InfoText>
                            </InfoWrapper>
                            <InfoWrapper>
                                <div>전화번호</div>
                                <InfoText>010-1234-4698</InfoText>
                            </InfoWrapper>
                        </Container> 
                        <Container>
                            <Title>찜목록</Title>
                            <SearchResultList>
                                {data.map((product) => (
                                    <SearchItem key={product.productId}>
                                        <ItemImageBox>
                                            <ItemImage src={product.files} alt={product.title} />
                                        </ItemImageBox>
                                        <ItemTitle>{product.title}</ItemTitle>
                                        <ItemInfo>{product.description}</ItemInfo>
                                        <ItemPrice>
                                            {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </ItemPrice>
                                        <Icon>❤️</Icon>
                                    </SearchItem>
                                ))}
                            </SearchResultList>
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
                    </Box>
                )}
                {currentTabIndex === 1 && (
                    <Box sx={{ p: 3 }}>
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
                    </Box>
                )}
                {currentTabIndex === 2 && (
                    <Box sx={{ p: 3 }}>
                        <BoxWrapper>
                            <Button style={{width: "100px",}} onClick={productAddPageButtonClick}  sx={{ mr: 2, color: "white", backgroundColor: "black", }} variant="contained" size="small">
                                상품 등록
                            </Button>
                            <ContentWrapper>
                                <div>
                                    <Container>
                                        <Title>등록된 상품 목록</Title>
                                        <Table>
                                            <tr>
                                                <TableTh>상품번호</TableTh>
                                                <TableTh>상품명</TableTh>
                                                <TableTh>카테고리</TableTh>
                                                <TableTh>상품상태</TableTh>
                                                <TableTh>댓글 조회</TableTh>
                                            </tr>
                                            <tr>
                                                <TableTd>1</TableTd>
                                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>아디다스 슬리퍼</a></TableTd>
                                                <TableTd>의류</TableTd>
                                                <TableTd>새 생품</TableTd>
                                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                                            </tr>
                                            <tr>
                                                <TableTd>2</TableTd>
                                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>나이키 신발</a></TableTd>
                                                <TableTd>의류</TableTd>
                                                <TableTd>중고 상품</TableTd>
                                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                                            </tr>
                                            <tr>
                                                <TableTd>3</TableTd>
                                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>아디다스 반팔티</a></TableTd>
                                                <TableTd>의류</TableTd>
                                                <TableTd>새상품</TableTd>
                                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                                            </tr>
                                            <tr>
                                                <TableTd>4</TableTd>
                                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>갤럭시 탭s7</a></TableTd>
                                                <TableTd>가전</TableTd>
                                                <TableTd>중고 상품</TableTd>
                                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                                            </tr>
                                            <tr>
                                                <TableTd>5</TableTd>
                                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>애플워치</a></TableTd>
                                                <TableTd>가전</TableTd>
                                                <TableTd>중고상품</TableTd>
                                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                                            </tr>
                                            <tr>
                                                <TableTd>6</TableTd>
                                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>청바지</a></TableTd>
                                                <TableTd>의류</TableTd>
                                                <TableTd>새 상품</TableTd>
                                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                                            </tr>
                                            <tr>
                                                <TableTd>7</TableTd>
                                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>긴팔 티셔츠</a></TableTd>
                                                <TableTd>의류</TableTd>
                                                <TableTd>새상품</TableTd>
                                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                                            </tr>
                                            <tr>
                                                <TableTd>8</TableTd>
                                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>아이패드</a></TableTd>
                                                <TableTd>가전 제품</TableTd>
                                                <TableTd>중고 상품</TableTd>
                                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                                            </tr>
                                            <tr>
                                                <TableTd>9</TableTd>
                                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>모니터</a></TableTd>
                                                <TableTd>가전 제품</TableTd>
                                                <TableTd>새 상품</TableTd>
                                                <TableTd><button onClick={reviewButtonOnClick}>댓글 목록</button></TableTd>
                                            </tr>
                                            <tr>
                                                <TableTd>10</TableTd>
                                                <TableTd><a href="/product/management/detail" onClick={productNameOnClick}>반바지</a></TableTd>
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
                        </BoxWrapper>
                    </Box>
                )}
            </Wrapper>
        </ContentLayout>
    );
};

export default MyPage;

const ContentLayout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Wrapper = styled.div`
    width: 1230px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    // border: 1px solid red;
    margin-top: 150px;
`;

const BoxWrapper = styled.div`
    width: 1230px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

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

const Pagination = styled.div`
   


`;

const PageButton = styled.button`
    width: 35px;
    height: 35px;
    background-color: black;
    color: white;
    cursor: pointer;

`;

const ProfileContainer = styled.div`
    width: 600px;
    height: 95px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 40px;
    margin-bottom: 30px;
    padding: 0 20px;
    gap: 10px;
    background-color: #F4F4F4;
`;

const ChangeImgButton = styled.button`
    width: 100px;
    height: 37px;
    margin-left: 360px;
    background-color: black;
    color: white;
    border: 1px solid black;
    cursor: pointer;
`;

const InfoWrapper = styled.div`
    width: 644px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 15px;
    gap: 10px;
`;

const InfoText  = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    border: 1px solid #D1D4D8;
    color: #b1b5b9;
    overflow-x: auto;

`;

const SearchResultList = styled.div`
    display: grid;
    row-gap: 40px;
    column-gap: 20px;
    grid-template-columns: 150px 150px 150px 150px;
`;

const SearchItem = styled.div`
    width: 120px;
`;

const ItemImageBox = styled.div`
    border-radius: 10px;
    background-color: rgb(244, 244, 244);
`;
const ItemImage = styled.img`
    width: 120px;
`;

const ItemTitle = styled.div`
    width: 120px;
    font-weight: bold;
`;

const ItemInfo = styled.div`
    width: 120px;
    height: 24px;
    font-size: 14px;
    margin-bottom: 20px;
`;

const ItemPrice = styled.div`
    font-weight: bold;
`;
const Icon = styled.div`
    /* 아이콘 스타일 */
    margin-right: 5px;
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