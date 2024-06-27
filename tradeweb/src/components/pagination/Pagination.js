import React from 'react';
import styled from "styled-components";
import axios from "axios";

const Pagination = () => {
    return (
       <PaginationWrapper>
            <PageButton>&laquo;</PageButton>
            <PageButton>1</PageButton>
            <PageButton>2</PageButton>
            <PageButton>3</PageButton>
            <PageButton>4</PageButton>
            <PageButton>5</PageButton>
            <PageButton>6</PageButton>
            <PageButton>&raquo;</PageButton>
       </PaginationWrapper>
    );
};

export default Pagination;

const PaginationWrapper = styled.div``;

const PageButton = styled.button`
    width: 35px;
    height: 35px;
    margin-right: 2px;
    background-color: white;
    color: black;
    cursor: pointer;
`;