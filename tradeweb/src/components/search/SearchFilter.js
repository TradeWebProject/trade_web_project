import React, { useState } from "react";
import styled from "styled-components";

//svg
import plus from "../../assets/plus.svg";
import minus from "../../assets/minus.svg";

const filters = [
  {
    title: "카테고리",
    options: ["카테고리 1", "카테고리 2"],
  },
  {
    title: "가격",
    options: ["1만원 이상", "10만원 이상"],
  },
  {
    title: "상품 상태",
    options: ["새 상품", "중고 상품"],
  },
];

const SearchFilter = () => {
  const [openFilters, setOpenFilters] = useState({});

  const toggleFilter = (filterTitle) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterTitle]: !prev[filterTitle],
    }));
  };

  return (
    <Container>
      <Filter>
        필터
        {filters.map((filter) => (
          <FilterBox key={filter.title}>
            <FilterHeader onClick={() => toggleFilter(filter.title)}>
              <FilterTitle>{filter.title}</FilterTitle>
              <FilterIconBox>
                <FilterIcon src={openFilters[filter.title] ? minus : plus} />
              </FilterIconBox>
            </FilterHeader>
            {openFilters[filter.title] && (
              <FilterMenu>
                {filter.options.map((option) => (
                  <CheckBox key={option}>
                    <input type="checkbox" /> {option}
                  </CheckBox>
                ))}
              </FilterMenu>
            )}
          </FilterBox>
        ))}
      </Filter>
    </Container>
  );
};

export default SearchFilter;

const Container = styled.div`
  width: 200px;
  padding-right: 10px;
  margin: 80px 10px 0 0;
`;

const Filter = styled.div`
  font-weight: bold;
`;

const FilterBox = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  cursor: pointer;
`;

const FilterTitle = styled.strong`
  font-size: 15px;
`;

const FilterIconBox = styled.div``;

const FilterIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const FilterMenu = styled.div``;

const CheckBox = styled.div`
  font-size: 14px;
  font-weight: normal;
  margin-top: 5px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
