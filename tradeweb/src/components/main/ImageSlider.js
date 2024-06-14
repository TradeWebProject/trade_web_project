import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images, width, height }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <SliderWrapper width={width}>
      <Slider {...settings}>
        {images.map((img) => (
          <ImgWrapper key={img.id} height={height}>
            <Img src={img.src} alt={img.alt || img.title} />
          </ImgWrapper>
        ))}
      </Slider>
    </SliderWrapper>
  );
};

export default ImageSlider;

const SliderWrapper = styled.div`
  width: ${(props) => props.width};
  margin: 0 auto;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
