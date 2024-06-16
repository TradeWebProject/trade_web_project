import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BarChart } from '@mui/x-charts/BarChart';
import axios from "axios";
import plus from "../../assets/plus.svg";

const UserProductSellHistory = () => {
    const navigate = useNavigate();
    const [navigateUrl, setNavigateUrl] = useState("");
    const [responseData, setResponseData] = useState([]);
    const [responseImageUrl, setResponseImageUrl] = useState("");
    const [selledStatus, setSelledStatus] = useState("");
    const token = localStorage.getItem("accessToken");
    const userId = 9;
    const selledProductStatus = 0;

    useEffect(() => {
        async function get() {
        
            try {
                const response  = await axios.get(`${process.env.REACT_APP_API_URL}products/user/${userId}`,
                            {
                                headers: {
                                    'Content-Type': "multipart/form-data",
                                    'Authorization': `Bearer ${token}`,
                                }
                            }
                ).then(function (response) {
                    console.log("응답 데이터:", response.data.products);
                    
                    // convertToBase66(response.data.products.imageUrl);
                    const productsArray = response.data.products;
                    setResponseData(productsArray);
                })
               
            } catch (error) {
                console.error("요청 실패:", error);
            }
        };
        get();
    }, []);

    const convertToBase66 = (imageFile) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onload = () => {
              resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
              reject(error);
            };
          });
    }

    const productNameOnClick = () => {
        setNavigateUrl("/product/management/detail");
        navigate(navigateUrl);
    };

    const reviewButtonOnClick = () => {
        navigate("/detail");
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
                            {responseData.map(function (data, index) {
                                // const blob = new Blob(data.imageUrl, {type: "image/png"});
                                // const url = window.URL.createObjectURL(blob);
                            
                                return  <tr>
                                            <TableTd>{data.productId}</TableTd>
                                            {/* <TableTd><img src={plus}/></TableTd> */}
                                            <TableTd><img src={`${process.env.REACT_APP_IMAGE_URL}${data.imageUrl}`}/></TableTd>
                                            <TableTd><a href="/product/management/detail/${data.productId}" onClick={productNameOnClick}>{data.productName}</a></TableTd>
                                            <TableTd>{data.category}</TableTd>
                                            <TableTd>{data.productQuality}</TableTd>
                                            <TableTd>{data.productStatus == 1 ? "판매안됨" : "판매완료"}</TableTd>
                                        </tr>
                            })}
                        </Table>
                        <Pagination class="pagination">
                            <PageButton>&laquo;</PageButton>
                            <PageButton>1</PageButton>
                            <PageButton>2</PageButton>
                            <PageButton>3</PageButton>
                            <PageButton>4</PageButton>
                            <PageButton>5</PageButton>
                            <PageButton>6</PageButton>
                            <PageButton>&raquo;</PageButton>
                        </Pagination>
                    </Container>
                    <Container>
                        <Title>판매완료된 상품 목록</Title>
                        <Table>
                            <tr>
                                <TableTh>상품번호</TableTh>
                                <TableTh>상품명</TableTh>
                                <TableTh>카테고리</TableTh>
                                <TableTh>상품상태</TableTh>
                                <TableTh>판매상태</TableTh>
                                
                            </tr>
                            {responseData.filter((data) => data.productStatus == 0 )
                                         .map((data, index) => (
                                            <tr>
                                                <TableTd>{data.productId}</TableTd>
                                                <TableTd><a href="/detail" onClick={productNameOnClick}>{data.productName}</a></TableTd>
                                                <TableTd>{data.category}</TableTd>
                                                <TableTd>중고 상품</TableTd>
                                                <TableTd>판매완료</TableTd>
                                            </tr>
                                         ))
                            }

                            {/* {responseData.filter((data) => data.productStatus == 1 ? <div>판매완료된 상품이 없습니다</div> : <></>)  
                                           
                                        
                                         
                            } */}
                        </Table>
                        
                            
                        <Pagination class="pagination">
                            <PageButton>&laquo;</PageButton>
                            <PageButton>1</PageButton>
                            <PageButton>2</PageButton>
                            <PageButton>3</PageButton>
                            <PageButton>4</PageButton>
                            <PageButton>5</PageButton>
                            <PageButton>6</PageButton>
                            <PageButton>&raquo;</PageButton>
                        </Pagination>
                    </Container>
                    {/* <Title>상품판매 현황</Title>
                    <div>
                    <BarChart
                        xAxis={[
                            {
                            id: 'barCategories',
                            data: ['bar A', 'bar B', 'bar C'],
                            scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                            data: [2, 5, 3],
                            },
                        ]}
                        width={500}
                        height={300}
                    />





                    </div> */}
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
    // border: 1px solid red;
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

const Pagination = styled.div``;

const PageButton = styled.button`
    width: 35px;
    height: 35px;
    background-color: black;
    color: white;
    cursor: pointer;
`;