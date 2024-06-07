import React, { useState } from "react";
import styled from "styled-components";

import plus from "../../assets/plus.svg";

const SearchContent = () => {
  const [listData, setListData] = useState([]);

  const products = listData.map((item) => ({
    image: item.files,
    title: item.title,
    price: item.price,
    description: item.description,
    productId: item.productId,
  }));

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

  const ListData = (data) => {
    setListData(data);
    console.log(data);
  };

  return (
    <>
      <Container>
        <SearchKeyword>'신발' 에 대한 검색 결과</SearchKeyword>
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
            </SearchItem>
          ))}
        </SearchResultList>
      </Container>
    </>
  );
};

export default SearchContent;

const Container = styled.div`
  margin-left: 220px;
`;

const SearchKeyword = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  color: black;
  margin: 20px 0 20px 0;
`;

const SearchResultList = styled.div`
  display: grid;
  row-gap: 40px;
  column-gap: 20px;
  grid-template-columns: 250px 250px 250px 250px;
`;

const SearchItem = styled.div`
  width: 200px;
`;

const ItemImageBox = styled.div`
  border-radius: 10px;
  background-color: rgb(244, 244, 244);
`;
const ItemImage = styled.img`
  width: 200px;
`;

const ItemTitle = styled.strong``;

const ItemInfo = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const ItemPrice = styled.strong``;
