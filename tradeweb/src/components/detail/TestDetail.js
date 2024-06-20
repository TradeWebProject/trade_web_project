import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";


const TestDetail = () => {
    const {productId} = useParams();
    const [produtData, setProductData] = useState("");
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        async function get() {
        
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}product/${productId}`,
                            {
                                headers: {
                                    'Content-Type': "multipart/form-data",
                                    'Authorization': `Bearer ${token}`,
                                }
                            }
                ).then(function (response) {
                    console.log("응답 데이터:", response.data);
                    setProductData(response.data);
                   
                })
               
            } catch (error) {
                console.error("요청 실패:", error);
            }
        };
        get();
    }, [productId]);

    return (
        <Wrapper>
        <Section>
          <MainImage src={`${process.env.REACT_APP_IMAGE_URL}${produtData.thumbnailUrl}`} alt="Main Image" />
          <Description dangerouslySetInnerHTML={{__html: produtData.description}}></Description>
        </Section>
      </Wrapper>
    );
};

export default TestDetail;

const Wrapper = styled.div`
  display: flex;
  margin-top: 100px;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  margin-top: 130px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 30px;
  position: relative;
  // border: 1px solid blue;
  width: 700px;
`;

const MainImage = styled.img`
  width: 700px;
  height: 448px;
`;

const Description = styled.p`
  /* 상세 설명 스타일링 */
  width: 700px;
`;