import React, { useState } from "react";
import SearchContent from "./SearchContent";
import SearchFilter from "./SearchFilter";
import styled from "styled-components";

const SearchResult = () => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (filterTitle, option) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (!newFilters[filterTitle]) {
        newFilters[filterTitle] = [];
      }

      if (newFilters[filterTitle].includes(option)) {
        newFilters[filterTitle] = newFilters[filterTitle].filter(
          (item) => item !== option
        );
      } else {
        newFilters[filterTitle].push(option);
      }
      return newFilters;
    });
  };

  const handleFilterRemove = (filterTitle, option) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      newFilters[filterTitle] = newFilters[filterTitle].filter(
        (item) => item !== option
      );
      if (newFilters[filterTitle].length === 0) {
        delete newFilters[filterTitle];
      }
      return newFilters;
    });
  };

  return (
    <Container>
      <FilterContainer>
        <SearchFilter
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onFilterRemove={handleFilterRemove}
        />
      </FilterContainer>
      <SearchContent
        selectedFilters={selectedFilters}
        onFilterRemove={handleFilterRemove}
      />
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
