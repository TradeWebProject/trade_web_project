import React from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";

const ProductList = ({ products }) => {
  return (
    <SearchResultList>
      {products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </SearchResultList>
  );
};

export default ProductList;

const SearchResultList = styled.div`
  display: grid;
  row-gap: 40px;
  column-gap: 20px;
  grid-template-columns: 250px 250px 250px 250px;
`;
