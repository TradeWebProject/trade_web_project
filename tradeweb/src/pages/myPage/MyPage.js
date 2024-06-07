import React, { useState } from 'react';
import styled from '@emotion/styled';
import {Box, Tab, Tabs, Button  } from "@mui/material";
import profile from "../../assets/profile.svg";

const MyPage = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const handleTabChange = (e, tabIndex) => {
        console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
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
                            {/* <InfoWrapper>
                                <div>프로필 이미지</div>
                                <img src="https://placehold.jp/50x50.png"/>
                            </InfoWrapper> */}
                        </Container>   
                    </Box>
                )}
                {currentTabIndex === 1 && (
                    <Box sx={{ p: 3 }}>
                        <Container>
                             <Title>결제내역</Title>
                              <Header>
                                    <div>결제일</div>
                                    <div>상품명</div>
                                    <div>결제금액</div>
                                    <div>결제번호</div>
                                    <div>결제상태</div>
                              </Header>  
                              <TableContent>
                                  <TableContentWrapper>
                                      <div>2024.06.05</div>
                                      <div>
                                          나이키 티셔츠
                                      </div>
                                      <div>
                                          56,000원
                                      </div>
                                      <div>
                                          0000001
                                      </div>
                                      <div>
                                          결제완료
                                      </div>
                                  </TableContentWrapper>
                                  {/* <TableContentWrapper>
                                      <div>2024.06.07</div>
                                      <div>
                                          아디다스 티셔츠
                                      </div>
                                      <div>
                                          0000002
                                      </div>
                                      <div>
                                          결제예정
                                      </div>
                                  </TableContentWrapper> */}

                              </TableContent>

                              <Title>내가 작성한 리뷰</Title>
                              <Header>
                                    <div>결제일</div>
                                    <div>상품명</div>
                                    <div>결제금액</div>
                                    <div>결제번호</div>
                                    <div>결제상태</div>
                              </Header>  
                              <TableContent>
                                  <TableContentWrapper>
                                      <div>2024.06.05</div>
                                      <div>
                                          나이키 티셔츠
                                      </div>
                                      <div>
                                          56,000원
                                      </div>
                                      <div>
                                          0000001
                                      </div>
                                      <div>
                                          결제완료
                                      </div>
                                  </TableContentWrapper>
                                  {/* <TableContentWrapper>
                                      <div>2024.06.07</div>
                                      <div>
                                          아디다스 티셔츠
                                      </div>
                                      <div>
                                          0000002
                                      </div>
                                      <div>
                                          결제예정
                                      </div>
                                  </TableContentWrapper> */}

                              </TableContent>
                              <Title>찜목록</Title>
                              <Header>
                                    <div>결제일</div>
                                    <div>상품명</div>
                                    <div>결제금액</div>
                                    <div>결제번호</div>
                                    <div>결제상태</div>
                              </Header>  
                              <TableContent>
                                  <TableContentWrapper>
                                      <div>2024.06.05</div>
                                      <div>
                                          나이키 티셔츠
                                      </div>
                                      <div>
                                          56,000원
                                      </div>
                                      <div>
                                          0000001
                                      </div>
                                      <div>
                                          결제완료
                                      </div>
                                  </TableContentWrapper>
                                  {/* <TableContentWrapper>
                                      <div>2024.06.07</div>
                                      <div>
                                          아디다스 티셔츠
                                      </div>
                                      <div>
                                          0000002
                                      </div>
                                      <div>
                                          결제예정
                                      </div>
                                  </TableContentWrapper> */}

                              </TableContent>

                        </Container>
                        
                    </Box>
                )}
                {currentTabIndex === 2 && (
                    <Box sx={{ p: 3 }}>
                        <BoxWrapper>
                          
                                <Button  sx={{ mr: 2 }} variant="contained" size="small">
                                    상품 등록
                                </Button>
                            
                            <ContentWrapper>
                                <div>
                                    <Tab style={{width: '160px'}} label='상품 관리'/>
                                    <div>
                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                    </div>
                                    <Tab style={{width: '160px'}} label='상품판매 현황'/>
                                    <div>
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                    </div>
                                    <Tab style={{width: '160px'}} label='리뷰 관리'/>
                                    <div>
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
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
    align-item: center;
`;

const ContentWrapper = styled.div`
    width: 1230px;
    display: flex;
    justify-content: space-around;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    // border: 1px solid red;
`;

const Title  = styled.div`
    margin: auto;
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
    // border: 1px solid red;
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


const Header = styled.div`
    width: 1000px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid red; 

`;


const TableContent = styled.div`
    width: 1000px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid green; 

`;


const TableContentWrapper = styled.div`
    width: 1000px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid green; 

`;