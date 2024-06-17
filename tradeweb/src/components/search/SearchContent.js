import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import close from "../../assets/close.svg";
import ProductList from "./ProductList";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SearchContent = ({ selectedFilters, onFilterRemove }) => {
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    console.log(keyword);
    const get = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}product/search?keyword=${keyword}`
        )
        .then((response) => {
          console.log("검색", response.data);
          setListData(response.data.products);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    get();
  }, [keyword]);

  // 무한스크롤
  const loadMore = useCallback(() => {
    const startIndex = (page - 1) * 8;
    const endIndex = startIndex + 8;

    const newItems = listData.slice(startIndex, endIndex);

    if (newItems.length === 0) {
      setHasMore(false);
    } else {
      setListData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }
  }, [page]);

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    if (!hasMore) return;

    console.log("useEffect");

    let currentLoader = loader.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore, hasMore]);

  return (
    <>
      <Container>
        <SearchKeyword>{keyword} 에 대한 검색 결과</SearchKeyword>
        <SelectedFilters>
          {Object.entries(selectedFilters).map(([filterTitle, options]) =>
            options.map((option) => (
              <FilterTag key={option}>
                {option}
                &nbsp;
                <CloseButton
                  src={close}
                  onClick={() => onFilterRemove(filterTitle, option)}
                />
              </FilterTag>
            ))
          )}
        </SelectedFilters>
        <ProductList products={listData} />
        <div ref={loader}></div>
      </Container>
    </>
  );
};

export default SearchContent;

const Container = styled.div`
  margin-left: 240px;
`;

const SearchKeyword = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  color: black;
  margin: 20px 0 20px 0;
`;

const SearchResultList = styled.div`
  display: grid;
  row-gap: 40px;
  column-gap: 20px;
  grid-template-columns: 250px 250px 250px 250px;
`;

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

const SelectedFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const FilterTag = styled.div`
  background-color: #eee;
  border-radius: 12px;
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
  display: flex;
`;

const CloseButton = styled.img`
  width: 15px;
  padding-top: 2px;
  cursor: pointer;
`;
