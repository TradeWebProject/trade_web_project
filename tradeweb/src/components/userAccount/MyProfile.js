
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import {Box } from "@mui/material";
import plus from "../../assets/plus.svg";

const MyProfile = () => {
    const [responseUserProfileData, setResponseUserProfileData] = useState("");
    const [userInterestsArray, setUserInterestsArray] = useState([]);



    const token = localStorage.getItem("accessToken");
    const userId = 9;
    useEffect(() => {
        async function get() {
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}users/${userId}`,
                            {
                                headers: {
                                    'Content-Type': "multipart/form-data",
                                    'Authorization': `Bearer ${token}`,
                                }
                            }
                ).then(function (response) {
                    console.log("응답 데이터:", response.data);
                    setResponseUserProfileData(response.data);
                    setUserInterestsArray(response.data.userInterests);
                   
                })
               
            } catch (error) {
                console.error("요청 실패:", error);
            }
        };
        get();
    }, [userId]);

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
  
    return (
        <Box sx={{ p: 3 }}>
                        <Container>
                            <Title>프로필</Title>
                          
                            <ProfileContainer>
                                <ProfileImage src={`${process.env.REACT_APP_IMAGE_URL}${responseUserProfileData.user_img}`} alt="profile"/>
                                <div>{responseUserProfileData.user_nickname}</div>
                                <div>
                                    <ChangeImgButton>사진 변경</ChangeImgButton>
                                </div>
                            </ProfileContainer>
                            <InfoWrapper>
                                <div>이메일</div>
                                <InfoText>{responseUserProfileData.email}</InfoText>
                            </InfoWrapper>
                            <InfoWrapper>
                                <div>전화번호</div>
                                <InfoText>{responseUserProfileData.user_phone}</InfoText>
                            </InfoWrapper>
                            <InfoWrapper>
                                <div>관심사</div>
                               
                                {userInterestsArray.map(function (interest, index) {
                                    return  <InterestsWrapper>
                                                <Interest>{interest}</Interest>
                                            </InterestsWrapper>
                                })}
                                
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

    );
};

export default MyProfile;

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

const ProfileImage = styled.img`
    width: 50px;
    heigth: 50px;
    border-radius: 50px;
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


const InterestsWrapper = styled.div`
    width: 644px;
    height: 40px;
    dispaly: flex;
`;

const Interest = styled.div`
    width: 50px;
    height: 20px;
    border-radius: 40px;
    background-color: white;
    color: black;
    border: 1px solid #D1D4D8;
    text-align: center;
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

const Pagination = styled.div``;

const PageButton = styled.button`
    width: 35px;
    height: 35px;
    background-color: black;
    color: white;
    cursor: pointer;
`;