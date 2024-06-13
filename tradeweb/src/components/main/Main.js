import React from "react";
import ImageSliderData from "./ImageSliderData";
import styled from "styled-components";
import "slick-carousel/slick/slick.css"; // slick 기본 스타일시트
import "slick-carousel/slick/slick-theme.css"; // slick 테마 스타일시트
import ImageSlider from "./ImageSlider";

const Main = () => {
  return (
    <>
      <ImageSliderWrapper>
        <ImageSlider images={ImageSliderData} width="960px" height="330px" />
      </ImageSliderWrapper>
    </>
  );
};

export default Main;

const ImageSliderWrapper = styled.div`
  margin-top: 130px;
`;
