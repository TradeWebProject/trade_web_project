import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import {Box, Tab, Tabs, Button  } from "@mui/material";

import MyProfile from '../userAccount/MyProfile';
import UserPayment from '../payment/UserPayment';
import UserProductSellHistory from '../payment/UserProductSellHistory';
import MyWishList from '../userAccount/MyWishList';


const MyPageManagement = () => {
    const navigate = useNavigate();

    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [navigateUrl, setNavigateUrl] = useState("");

    const handleTabChange = (e, tabIndex) => {
        console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };

    const productAddPageButtonClick = () => {
        setNavigateUrl("/write");
        navigate(navigateUrl);
    };

    return (
        <ContentLayout>
            <Wrapper>
                <Box sx={{display: 'flex', alignItems: 'flex-start', width: 1230}}>
                    <Tabs value={currentTabIndex} onChange={handleTabChange} variant="fullWidth">
                        <Tab style={{width: '160px'}} label='마이 프로필' />
                        <Tab label='결제 내역' />
                        <Tab label='판매 내역' />
                        <Tab label='찜 목록' />
                    </Tabs>
                </Box>
                {currentTabIndex === 0 && (
                    <Box sx={{ p: 3 }}>
                        {
                        <MyProfile/>
                        }
                    </Box>

                )}
                {currentTabIndex === 1 && (
                    <Box sx={{ p: 3 }}>
                        {
                        <UserPayment/>
                        }
                    </Box>
                )}
                {currentTabIndex === 2 && (
                    <Box sx={{ p: 3 }}>
                        <BoxWrapper>
                            <Button style={{width: "100px",}} onClick={productAddPageButtonClick}  sx={{ mr: 2, color: "white", backgroundColor: "black", }} variant="contained" size="small">
                                상품 등록
                            </Button>
                            {<UserProductSellHistory/>}
                        </BoxWrapper>
                    </Box>
                )}
                {currentTabIndex === 3 && (
                 <Box sx={{ p: 3 }}>
                     {
                         <MyWishList/>
                     }
                 </Box>
                )}
            </Wrapper>
        </ContentLayout>
    );
};

export default MyPageManagement;

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