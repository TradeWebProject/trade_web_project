import React from "react";
import styled from "styled-components";

const ProductItem = ({ product }) => {
  return (
    <SearchItem>
      <ItemImageBox>
        <ItemImage src={product.files} alt={product.title} />
      </ItemImageBox>
      <ItemTitle>{product.title}</ItemTitle>
      <ItemInfo>{product.description}</ItemInfo>
      <ItemPrice>
        {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </ItemPrice>
    </SearchItem>
  );
};

export default ProductItem;

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
