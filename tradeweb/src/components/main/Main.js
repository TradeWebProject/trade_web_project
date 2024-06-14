import React, { useEffect, useState } from "react";
import ImageSliderData from "./ImageSliderData";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dummyData from "../search/dummyData";
import { useNavigate } from "react-router-dom";

//component
import ImageSlider from "./ImageSlider";
import ProductList from "../search/ProductList";

const Main = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(dummyData.slice(0, 8));
  }, []);

  return (
    <>
      <ImageSliderWrapper>
        <ImageSlider images={ImageSliderData} width="1040px" height="330px" />
      </ImageSliderWrapper>
      <ProductListWrapper>
        <ProductListHeader>
          <ProductListTitle>거래를 기다리는 상품</ProductListTitle>
          <ShowMoreProducts onClick={() => navigate("/search")}>
            더 많은 상품보러가기
          </ShowMoreProducts>
        </ProductListHeader>
        <ProductList products={products} />
      </ProductListWrapper>
    </>
  );
};

export default Main;

const ImageSliderWrapper = styled.div`
  margin-top: 130px;
`;

const ProductListWrapper = styled.div`
  padding: 50px;
  width: 1040px;
`;

const ProductListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductListTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 20px 0 20px 0;
`;

const ShowMoreProducts = styled.div`
  font-size: 14px;

  color: gray;
  cursor: pointer;
`;
