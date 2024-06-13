import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import {Box, Tab, Tabs, Button  } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

import profile from "../../assets/profile.svg";
import plus from "../../assets/plus.svg";
import Modal from '../../components/common/Modal/Modal';
import MyPageManagement from '../../components/myProductManagement/MyPageManagement';

const MyPage = () => {

    return (
       <MyPageManagement/>
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