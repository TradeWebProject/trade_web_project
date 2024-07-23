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
            <Wrapper>
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
                <GetLikeMoreButton>더보기</GetLikeMoreButton>
                
            </Wrapper>
            
        </Box>
    );
};

export default MyWishList;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const Container = styled.div`
    width: 1230px;
    height: 100vh;
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
    height: 200px;
    row-gap: 40px;
    display: grid;
    row-gap: 140px;
    column-gap: 40px;
    grid template-comumns: 200px 200px 200px 200px;
`;

const SearchItem = styled.div`
    width: 200px;
    height: 200px;
`;

const ItemImageBox = styled.div`
    border-radius: 10px;
`;
const ItemImage = styled.img`
    width: 200px;
    height:200px;
`;

const ItemTitle = styled.div`
    width: 120px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const ItemInfo = styled.div`
    width: 120px;
    height: 24px;
    font-size: 14px;
    margin-bottom: 20px;
`;

const ItemPrice = styled.div`
    font-weight: bold;
    margin-bopttom: 20px;
`;
const HeartIcon = styled.div`
    margin-right: 5px;
    margin-bottom: 20px;
    cursor:pointer;
`;

const GetLikeMoreButton = styled.button`
     margin-top: 200px;

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