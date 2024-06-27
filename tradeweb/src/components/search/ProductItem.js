import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  const ClickProduct = (productId) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <SearchItem onClick={() => ClickProduct(product.productId)}>
      <ItemImageBox>
        <ItemImage
          src={`${process.env.REACT_APP_IMAGE_URL}${product.imageUrl}`}
          alt={product.productName}
        />
      </ItemImageBox>
      <ItemTitle>{product.productName}</ItemTitle>

      <ItemPrice>
        {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </ItemPrice>
    </SearchItem>
  );
};

export default ProductItem;

const SearchItem = styled.a`
  cursor: pointer;
`;

const ItemImageBox = styled.div`
  width: 200px;
  height: 300px;
  border-radius: 10px;
  background-color: rgb(244, 244, 244);
  overflow: hidden;
  margin-bottom: 10px;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: contain;
`;

const ItemTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const ItemPrice = styled.strong``;
