import React, { useState } from 'react';
// import styled from "styled-components";
// import { styled } from '@mui/system';
import styled from '@emotion/styled';

import {Box, Tab, Tabs, Button  } from "@mui/material";
const MyPage = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const handleTabChange = (e, tabIndex) => {
        console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };

    return (
        <ContentLayout>
            <NavWrapper>
                <h1>Navbar</h1>    
            </NavWrapper>
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
                        <div>A</div>
                        <div>A</div>
                        <div>A</div>
                    </Box>
                )}
                {currentTabIndex === 1 && (
                    <Box sx={{ p: 3 }}>
                        <div>B</div>
                        <div>B</div>
                        <div>B</div>
                    </Box>
                )}
                {currentTabIndex === 2 && (
                    <Box sx={{ p: 3 }}>
                        <BoxWrapper>
                            <ButtonWrapper>
                                <Button  sx={{ mr: 2 }} variant="contained" size="medium">
                                    상품 등록
                                </Button>
                            </ButtonWrapper>
                            <ContentWrapper>
                                <div>
                                    <Tab style={{width: '160px'}} label='상품 관리'/>
                                    <Tab style={{width: '160px'}} label='상품판매 현황'/>
                                    <Tab style={{width: '160px'}} label='리뷰 관리'/>
                                </div>
                                <div>
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
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

const NavWrapper = styled.div`
    width: 1230px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 1230px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid red;
    margin-top: 40px;
`;

const BoxWrapper = styled.div`
    width: 1230px;
    display: flex;
    flex-direction: column;
    align-item: center;
`;

const ButtonWrapper = styled.div`
    width: 1230px;
    margin-right: 10px;
    display: flex;
    justify-content: flex-end;
    border: 1px solid green;
`;

const ContentWrapper = styled.div`
    width: 1230px;
    display: flex;
    justify-content: space-around;
`;