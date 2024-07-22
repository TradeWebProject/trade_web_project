import React, {useEffect,  useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import plus from "../../assets/plus.svg";
import {Box } from "@mui/material";

const MyWishList = () => {
    const [responseData, setResponseData] = useState([]);
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const [productId, setProductId] = useState(0);


    useEffect(() => {
        async function get() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}likes/user/${userId}`, {
                    headers: {
                        'Content-Type': "multipart/form-data",
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log("응답 데이터:", response.data.products);
                setResponseData(response.data.products)
               
            } catch (error) {
                console.error("요청 실패:", error);
            }
        };
        if (userId && token) {
            get();
        }
    }, [userId, token]); 

    const dislikeClick = (productId) => {
        console.log("disLikeProductId: ", productId);
        setResponseData(responseData.filter(product => product.productId !== productId));
        sendDisLikeProductId(productId);
    }

    const sendDisLikeProductId = async (productId) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}likes`, 
                {
                    productId: productId,
                },
                {
                    headers: {
                        'Content-Type': "multipart/form-data",
                        'Authorization': `Bearer ${token}`,
                    },
                });
            console.log("응답 데이터:", response.data.products);
            setResponseData(response.data.products);
        } catch (error) {
            console.error("요청 실패:", error);
        }
    }


    return (
        <Box sx={{ p: 3 }}>
            <Container>
                <Title>찜목록</Title>
                <SearchResultList>
                    {responseData.length > 0 ?  responseData.map((product) => (
                        <SearchItem key={product.productId}>
                            <ItemImageBox>
                                <ItemImage src={`${process.env.REACT_APP_IMAGE_URL}${product.imageUrl}`} alt={product.productName} />
                            </ItemImageBox>
                            <ItemTitle>{product.productName}</ItemTitle>
                            <ItemPrice>
                                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </ItemPrice>
                            <HeartIcon onClick={() => dislikeClick(product.productId)}>❤️</HeartIcon>
                        </SearchItem>
                    )) : <h1>찜한 상품이 없습니다</h1>}
                   
                </SearchResultList>
              
            </Container>
        </Box>
    );
};

export default MyWishList;

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


const SearchResultList = styled.div`
    display: flex;
    row-gap: 40px;
    column-gap: 20px;
    // grid-template-columns: 150px 150px 150px 150px 120px;
`;

const SearchItem = styled.div`
    width: 120px;
`;

const ItemImageBox = styled.div`
    border-radius: 10px;
    background-color: rgb(244, 244, 244);
`;
const ItemImage = styled.img`
    width: 200px;
    height:200px;
`;

const ItemTitle = styled.div`
    width: 120px;
    font-weight: bold;
`;

const ItemInfo = styled.div`
    width: 120px;
    height: 24px;
    font-size: 14px;
    margin-bottom: 20px;
`;

const ItemPrice = styled.div`
    font-weight: bold;
`;
const HeartIcon = styled.div`
    /* 아이콘 스타일 */
    margin-right: 5px;
    cursor:pointer;
`;

const Pagination = styled.div``;

const PageButton = styled.button`
    width: 35px;
    height: 35px;
    background-color: black;
    color: white;
    cursor: pointer;
`;

const InterestsWrapper = styled.div`
    width: 644px;
    height: 40px;
    dispaly: flex;
`;

const Interest = styled.div`
    width: 50px;
    height: 20px;
    border-radius: 40px;
    background-color: white;
    color: black;
    border: 1px solid #D1D4D8;
    text-align: center;
`;