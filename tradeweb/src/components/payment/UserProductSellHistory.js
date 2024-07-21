import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Pagination from '../pagination/Pagination';

const UserProductSellHistory = () => {
    const navigate = useNavigate();
    const location = useLocation();
   
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get("productId");
    const [navigateUrl, setNavigateUrl] = useState("");
    const [totalPosts, setResponseData] = useState([]);
    const [postsPerPage, setPostsPerPage] = useState(8);// 한페이지에 8개의 상품을 보여준다
    const [currentPage, setCurrentPage] = useState(2); //현재페이지
    const [currentProduct, setCurrentProduct] = useState(0);
    const [result, setResult] = useState(0);
    const lastPostInedx = currentPage * postsPerPage; 
    const firstPostIndex = lastPostInedx - postsPerPage;

    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const selledProductStatus = 0;
    
    useEffect(() => {
        async function get() {
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}products/user/${userId}`,
                            {
                                headers: {
                                    'Content-Type': "multipart/form-data",
                                    'Authorization': `Bearer ${token}`,
                                },
                                params : {
                                    'page' :  currentPage,
                                    'size' : 8,
                                    'sort': "desc"
                                }
                            }
                ).then(function (response) {
                    const productsArray = response.data.products;
                    setResponseData(productsArray);
                    console.log("베열 길이: " , totalPosts.length);
                    let result = totalPosts.slice(firstPostIndex, lastPostInedx);
                    setCurrentProduct(result);
                    
                })
               
            } catch (error) {
                console.error("요청 실패:", error);
            }
        };
        get();
    }, []);

    const productNameOnClick = (productId) => {
        setNavigateUrl("/product/management/detail");
        console.log(productId);
        navigate(`navigateUrl/${productId}` , { state: {
                                                 pId: productId 
                                                } 
                                            } );
    };

    const reviewButtonOnClick = () => {
        navigate("/my-page");
    };

    return (
        <>
            <ContentWrapper>
                <div>
                    <Container>
                        <Title>등록된 상품 목록</Title>
                        <Table>
                            <tr>
                                <TableTh>상품번호</TableTh>
                                <TableTh>상품사진</TableTh>
                                <TableTh>상품명</TableTh>
                                <TableTh>카테고리</TableTh>
                                <TableTh>상품상태</TableTh>
                                <TableTh>판매상태</TableTh>
                            </tr>
                            {totalPosts.map(function (data, index) {
                                return  <tr>
                                            <TableTd>{data.productId}</TableTd>
                                            <TableTd><TableRowImage src={`${process.env.REACT_APP_IMAGE_URL}${data.imageUrl}`}/></TableTd>
                                            <TableTd><a href={`/product/management/detail/${data.productId}`} onClick={() => productNameOnClick(data.productId)}>{data.productName}</a></TableTd>
                                            <TableTd>{data.category}</TableTd>
                                            <TableTd>{data.productQuality}</TableTd>
                                            <TableTd>{data.productStatus == 1 ? "판매안됨" : "판매완료"}</TableTd>
                                        </tr>
                            })}
                        </Table>
                        <Pagination totalPosts={totalPosts.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}/>
                    </Container>
                </div>
            </ContentWrapper>
        </>
    );
};

export default UserProductSellHistory;

const ContentWrapper = styled.div`
    width: 1230px;
    display: flex;
    justify-content: space-around;
`;

const Container = styled.div`
    width: 1230px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title  = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
`;

const Table = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    margin-bottom: 40px;
`;

const TableTh = styled.th`
    padding: 6px 15px;
    background: #42444e;
    color: #fff;
    text-align: center;
`;

const TableTd = styled.td`
    padding: 6px 15px;
    text-align: center;
`;

const TableRowImage = styled.img`
    width: 200px;
    height: 200px;
`;

// const Pagination = styled.div``;

// const PageButton = styled.button`
//     width: 35px;
//     height: 35px;
//     margin-right: 2px;
//     background-color: white;
//     color: black;
//     cursor: pointer;
// `;