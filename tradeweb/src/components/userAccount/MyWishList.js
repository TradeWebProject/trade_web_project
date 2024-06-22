import React from 'react';
import styled from "styled-components";
import plus from "../../assets/plus.svg";
import {Box } from "@mui/material";

const MyWishList = () => {
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
                <Pagination>
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

export default MyWishList;

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


const SearchResultList = styled.div`
    display: grid;
    row-gap: 40px;
    column-gap: 20px;
    grid-template-columns: 150px 150px 150px 150px 120px;
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