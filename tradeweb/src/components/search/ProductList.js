import React from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";

const ProductList = ({ products }) => {
  return (
    <SearchResultList>
      {products.map((product, productsId) => (
        <ProductItem key={productsId} product={product} />
      ))}
    </SearchResultList>
  );
};

export default ProductList;

const SearchResultList = styled.div`
  display: grid;
  row-gap: 40px;
  column-gap: 80px;
  grid-template-columns: 200px 200px 200px 200px;
`;
