import React, { useState } from 'react';
import styled from "styled-components";
import axios from "axios";

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, paginate}) => {
    let pages = [];

    for (let i = 0; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i + 1);
    }

    return (
       <PaginationWrapper>
          {
            pages.map((page, index) => {
                return <PageButton key={index} onClick={() => paginate(page)}>{page}</PageButton>
            })
          }
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