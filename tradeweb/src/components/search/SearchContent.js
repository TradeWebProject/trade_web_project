import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import close from "../../assets/close.svg";
import ProductList from "./ProductList";
import axios from "axios";
import { useLocation } from "react-router-dom";

import SearchFilter from "./SearchFilter";


const SearchContent = ({ selectedFilters, onFilterRemove }) => {
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const loader = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const buildUrl = useCallback(() => {
    let url = `${process.env.REACT_APP_API_URL}product/search?keyword=${keyword}&page=${page}&size=8&sort=asc`;

    Object.entries(selectedFilters).forEach(([filterTitle, options]) => {
      if (options.length > 0) {
        options.forEach((option) => {
          if (filterTitle == "priceRange") {
            return;
          } else {
            url += `&${filterTitle}=${option}`;
          }
        });
      }
    });

    if (minPrice !== "") {
      url += `&minPrice=${minPrice}`;
    }
    if (maxPrice !== "") {
      url += `&maxPrice=${maxPrice}`;
=======

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

    return url;
  }, [keyword, page, selectedFilters, minPrice, maxPrice]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const url = buildUrl();
      const response = await axios.get(url);
      const newData = response.data.products;

      setListData((prevData) =>
        page === 1 ? newData : [...prevData, ...newData]
      );
      setHasMore(newData.length === 8);
      setNoResults(newData.length === 0 && page === 1);
      console.log(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [buildUrl, page, keyword]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleObserver = (entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);

  useEffect(() => {
    setPage(1);
    fetchData();
  }, [selectedFilters, minPrice, maxPrice]);

  const handlePriceFilterRemove = () => {
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
    fetchData();
  };

  return (
    <>
      <Container>
        <SearchKeyword>{keyword} 에 대한 검색 결과</SearchKeyword>
        <SelectedFilters>
          {Object.entries(selectedFilters).map(([filterTitle, options]) =>
            options.map((option) => (
              <FilterTag key={`${filterTitle}-${option}`}>
                {option}
                &nbsp;
                <CloseButton
                  src={close}
                  onClick={() => onFilterRemove(filterTitle, option)}
                />
              </FilterTag>
            ))
          )}
          {minPrice && maxPrice && (
            <FilterTag key={`${minPrice} ~ ${maxPrice}원`}>
              {`${minPrice} ~ ${maxPrice}원`}
              &nbsp;
              <CloseButton src={close} onClick={handlePriceFilterRemove} />
            </FilterTag>
          )}
        </SelectedFilters>
        {loading && <LoadingMessage>로딩 중...</LoadingMessage>}
        {!loading && noResults && (
          <NoResultsMessage>검색 결과가 없습니다</NoResultsMessage>
        )}
        <ProductList products={listData} />
        {hasMore && <div ref={loader}></div>}
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

const LoadingMessage = styled.div`
  height: 500px;
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
`;

const NoResultsMessage = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
`;
