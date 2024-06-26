import React, { useEffect, useState } from "react";
import ImageSliderData from "./ImageSliderData";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

//component
import ImageSlider from "./ImageSlider";
import ProductList from "../search/ProductList";
import axios from "axios";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [listData, setListData] = useState([]);
  const [interestListData, setInterestListData] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  //최신 상품
  useEffect(() => {
    const get = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}product`)
        .then((response) => {
          setListData(response.data.products);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    get();
    setProducts(listData.slice(0, 8));
  }, []);

  //로그인 시 관심상품
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const interest = localStorage.getItem("interest").split(",");
    let randomValue = Math.random();
    let int = 0;

    if (token) {
      setLoggedIn(true);
      let length = interest.length;
      int = Math.floor(randomValue * length);
      console.log(int);
    }

    const getInterest = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}product/search?category=${interest[int]}`
        )
        .then((response) => {
          setInterestListData(response.data.products);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getInterest();
    setProducts(interestListData.slice(0, 8));
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
        <ProductList products={listData} />
      </ProductListWrapper>
      {isLoggedIn && interestListData.length !== 0 ? (
        <>
          <ProductListWrapper>
            <ProductListHeader>
              <ProductListTitle>회원님의 관심 상품</ProductListTitle>
              <ShowMoreProducts onClick={() => navigate("/search")}>
                더 많은 상품보러가기
              </ShowMoreProducts>
            </ProductListHeader>
            <ProductList products={interestListData} />
          </ProductListWrapper>
        </>
      ) : (
        <></>
      )}
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
