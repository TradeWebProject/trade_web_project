import React, { useState } from "react";
import styled from "styled-components";

//svg
import plus from "../../assets/plus.svg";
import minus from "../../assets/minus.svg";

const filters = [
  {
    title: "카테고리",
    filterTitle: "category",
    options: [
      "전자제품",
      "의류",
      "가전",
      "문구",
      "도서",
      "신발",
      "여행용품",
      "스포츠",
    ],
  },
  {
    title: "제품 상태",
    filterTitle: "quality",
    options: ["새상품", "중고 상품"],
  },
];

const SearchFilter = ({ selectedFilters, onFilterChange, onPriceChange }) => {
  const [openFilters, setOpenFilters] = useState({});
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const toggleFilter = (filterTitle) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterTitle]: !prev[filterTitle],
    }));
  };

  const handleMinPriceChange = (e) => {
    const regex = /^[0-9\b]+$/;

    if (e.target.value === "" || regex.test(e.target.value)) {
      setMinPrice(e.target.value);
    }
  };

  const handleMaxPriceChange = (e) => {
    const regex = /^[0-9\b]+$/;

    if (e.target.value === "" || regex.test(e.target.value)) {
      setMaxPrice(e.target.value);
    }
  };

  const handlePriceChange = () => {
    if (minPrice <= maxPrice) {
      onFilterChange("priceRange", `${minPrice}원 ~ ${maxPrice}원`);
      onFilterChange("minPrice", minPrice);
      onFilterChange("maxPrice", maxPrice);
    } else {
      setMinPrice("");
      setMaxPrice("");
      onPriceChange(minPrice, maxPrice);
    }
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
                    <input
                      type="checkbox"
                      checked={
                        selectedFilters[filter.title] &&
                        selectedFilters[filter.title].includes(option)
                      }
                      onChange={() =>
                        onFilterChange(filter.filterTitle, option)
                      }
                    />{" "}
                    {option}
                  </CheckBox>
                ))}
              </FilterMenu>
            )}
          </FilterBox>
        ))}
        <FilterBox>
          <FilterHeader onClick={() => toggleFilter("가격")}>
            <FilterTitle>가격</FilterTitle>
            <FilterIconBox>
              <FilterIcon src={openFilters["가격"] ? minus : plus} />
            </FilterIconBox>
          </FilterHeader>
          {openFilters["가격"] && (
            <PriceFilterMenu>
              <NumberInput
                type="text"
                value={minPrice}
                onChange={handleMinPriceChange}
                maxLength={7}
              />
              &nbsp; ~ &nbsp;
              <NumberInput
                type="text"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                maxLength={7}
              />
              <ApplyButton onClick={handlePriceChange}>적용</ApplyButton>
            </PriceFilterMenu>
          )}
        </FilterBox>
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

const PriceFilterMenu = styled.div`
  margin-top: 10px;
`;

const CheckBox = styled.div`
  font-size: 14px;
  font-weight: normal;
  margin-top: 5px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NumberInput = styled.input`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  width: 50px;
  height: 18px;
`;

const ApplyButton = styled.button`
  padding: 3px 5px;
  margin-left: 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;
