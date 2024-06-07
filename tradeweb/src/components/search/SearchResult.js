import React from "react";
import SearchContent from "./SearchContent";
import SearchFilter from "./SearchFilter";
import styled from "styled-components";

const SearchResult = () => {
  return (
    <Container>
      <FilterContainer>
        <SearchFilter />
      </FilterContainer>
      <SearchContent />
    </Container>
  );
};

export default SearchResult;

const Container = styled.div`
  display: flex;
  margin-top: 80px;
`;

const FilterContainer = styled.div`
  position: fixed;
`;
