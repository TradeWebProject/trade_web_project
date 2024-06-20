
import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import axios from "axios";
import {Box } from "@mui/material";
import plus from "../../assets/plus.svg";
import plusIcon from "../../assets/plus.svg";
import profile from "../../assets/profile.svg";

const MyProfile = () => {
    const [responseUserProfileData, setResponseUserProfileData] = useState("");
    const [profileUpdateStatus, setProfileUpdateStatus]  = useState(false);
    const [userInterestsArray, setUserInterestsArray] = useState([]);
    const [responseData, setResponseData] = useState("");
    const [ImageUpdateStatus, setImageUpdateStatus] = useState(false); 
    const [Image, setImage] = useState(profile);  // (1)번 설명
    const [files, setFiles] = useState([]);
    const [rawFiles, setRawFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        userPassword: "",
        phone: "",
        nickname: "",
        userImg: null,
        interests: [],
    });
  
    const interestsOptions = ["전자기기", "의류", "가전", "문구", "도서", "신발", "여행용품", "스포츠"];
    const [isSelectedIndex, setSelectedIndex] = useState(0);
    
    const [nickname, setNickName] = useState("");
    const [phone, setPhone] = useState("");
    const [interests, setInserests] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const token = localStorage.getItem("accessToken");
    const userId = 9;
    

    useEffect(() => {
        async function get() {
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}users/${userId}`,
                            {
                                headers: {
                                    'Content-Type': "multipart/form-data",
                                    'Authorization': `Bearer ${token}`,
                                }
                            }
                ).then(function (response) {
                    console.log("응답 데이터:", response.data);
                    setResponseUserProfileData(response.data);
                    setUserInterestsArray(response.data.userInterests);
                   
                })
               
            } catch (error) {
                console.error("요청 실패:", error);
            }
        };
        get();
    }, [userId]);

    const profileUpdateOnClick = () => {
        setProfileUpdateStatus(true);
    };

  

    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            userImg: e.target.files[0],
        }));     
    };

    const handleClicked = idx =>  {
        console.log("idx: ", idx);
        setSelectedIndex(idx);
        setInserests(interestsOptions[idx]);
    };

    const handleProfileUpdate = () => {
        update();  
    };
    
    const update = () => {
        try {
            const form = new FormData();
            form.append("email", email);
            form.append("password", password);
            form.append("nickname", nickname);
            form.append("phone", phone);
            form.append("interests",interests);
            form.append("userImg", formData.userImg);
            console.log("수정된 데이터: ");
            for (let [key, value] of form.entries()) {
                console.log(key + ", " + value);
            }

            axios.put(`${process.env.REACT_APP_API_URL}users/edit/${userId}`,
                      form,
                      {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            'Authorization': `Bearer ${token}`,
                        }
                      }
            ).then(function (response) {
                console.log("응답 데이터:", response.data.products);
                const productsArray = response.data.products;
                setResponseData(productsArray);
            })
           
        } catch (error) {
            console.error("요청 실패:", error);
        }
    };

    const data = [
        {
          files: plus,
          title: "나이키 신발",
          price: 240000,
          description: "나이키 운동화 사이즈 300",
          productId: 1,
        },
        {
          files: plus,
          title: "아디다스 신발",
          price: 340000,
          description: "아디다스 삼선 슬리퍼 사이즈260",
          productId: 2,
        },
        {
          files: plus,
          title: "닥터마틴 로퍼",
          price: 270000,
          description: "닥터마틴 로퍼 사이즈 270",
          productId: 3,
        },
        {
          files: plus,
          title: "흰색 셔츠",
          price: 20000,
          description: "미개봉 흰색 셔츠",
          productId: 4,
        },
        {
            files: plus,
            title: "나이키 신발",
            price: 240000,
            description: "나이키 운동화 사이즈 300",
            productId: 1,
          },
          {
            files: plus,
            title: "아디다스 신발",
            price: 340000,
            description: "아디다스 삼선 슬리퍼 사이즈260",
            productId: 2,
          },
          {
            files: plus,
            title: "닥터마틴 로퍼",
            price: 270000,
            description: "닥터마틴 로퍼 사이즈 270",
            productId: 3,
          },
          {
            files: plus,
            title: "흰색 셔츠",
            price: 20000,
            description: "미개봉 흰색 셔츠",
            productId: 4,
          },
          {
            files: plus,
            title: "닥터마틴 로퍼",
            price: 270000,
            description: "닥터마틴 로퍼 사이즈 270",
            productId: 3,
          },
          {
            files: plus,
            title: "흰색 셔츠",
            price: 20000,
            description: "미개봉 흰색 셔츠",
            productId: 4,
          },
    ];
  
    return (
        <Box sx={{ p: 3 }}>
            {profileUpdateStatus == false ? <Container>
                    <Title>프로필</Title>
                    <ProfileContainer>
                        <ProfileImage src={`${process.env.REACT_APP_IMAGE_URL}${responseUserProfileData.user_img}`} alt="profile"/>
                        <div>{responseUserProfileData.user_nickname}</div>
                        <div>
                            <ChangeImgButton onClick={profileUpdateOnClick}>프로필 수정</ChangeImgButton>
                        </div>
                    </ProfileContainer>
                    <InfoWrapper>
                        <div>이메일</div>
                        <InfoText>{responseUserProfileData.email}</InfoText>
                    </InfoWrapper>
                    <InfoWrapper>
                        <div>전화번호</div>
                        <InfoText>{responseUserProfileData.user_phone}</InfoText>
                    </InfoWrapper>
                    <InfoWrapper>
                        <div>관심사</div>
                        <InterestsWrapper>
                        {userInterestsArray.map(function (interest, index) {
                            return  <Interest key={index} isActive={interest == userInterestsArray[0] }>{interest}</Interest>    
                        })}
                        </InterestsWrapper>
                    </InfoWrapper>
                </Container> :
                <Container>
                    <Title>프로필 수정</Title>
                    <ProfileContainer>
                        {ImageUpdateStatus == false ?  <ProfileImage src={`${process.env.REACT_APP_IMAGE_URL}${responseUserProfileData.user_img}`} alt="profile"/> :
                        <ProfileImage src={formData.userImg} alt="profile"/>}
                        <ImageButton>
                            <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                            />
                            
                            <PlusIcon />
                        </ImageButton>
                        
                        <div>
                            <ChangeImgButton onClick={handleProfileUpdate}>프로필 저장</ChangeImgButton>
                        </div>
                    </ProfileContainer>
                    <InfoWrapper>
                        <div>닉네임</div>
                        <ProductNameInput type="text" onChange={(e) => setNickName(e.target.value)} defaultValue={responseUserProfileData.user_nickname}/>
                    </InfoWrapper>
                    <InfoWrapper>
                        <div>전화번호</div>
                        <ProductNameInput type="text" onChange={(e) => setPhone(e.target.value)} defaultValue={responseUserProfileData.user_phone}/>
                    </InfoWrapper>
                    <InfoWrapper>
                        <div>관심사</div>
                        <InterestsWrapper>
                        {interestsOptions.map(function (option, index) {
                            return  <Interest key={index} onClick={() => handleClicked(index)} isActive={isSelectedIndex === index}>{option}</Interest>
                        })}
                    
                        </InterestsWrapper>
                    </InfoWrapper>
                    <InfoWrapper>
                        <div>비밀번호 확인</div>
                        <ProductNameInput type="text" onChange={(e) => setPassword(e.target.value)} placeholder="프로필 수정을 위해 비밀번호를 입력한 후 프로필 저장버튼을 눌러주세요"/>
                    </InfoWrapper>
                </Container>
            }
                    
                <Container>
                    <Title>찜목록</Title>
                    <SearchResultList>
                        {data.map((product) => (
                            <SearchItem key={product.productId}>
                                <ItemImageBox>
                                    <ItemImage src={product.files} alt={product.title} />
                                </ItemImageBox>
                                <ItemTitle>{product.title}</ItemTitle>
                                <ItemInfo>{product.description}</ItemInfo>
                                <ItemPrice>
                                    {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </ItemPrice>
                                <Icon>❤️</Icon>
                            </SearchItem>
                        ))}
                    </SearchResultList>
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
        </Box>

    );
};



export default MyProfile;

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

const ProfileContainer = styled.div`
    width: 600px;
    height: 95px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 40px;
    margin-bottom: 30px;
    padding: 0 20px;
    gap: 10px;
    background-color: #F4F4F4;
`;

const ProfileImage = styled.img`
    width: 50px;
    heigth: 50px;
    border-radius: 50px;
`;

const ImageButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 55px;
  height: 55px;
  border: 1px solid #ccc;
  background-color: #f4f4f4;
  color: #ccc;
  cursor: pointer;
`;

const PlusIcon = styled.div`
  width: 15px;
  height: 15px;
  background-image: url(${plusIcon});
  background-size: cover;
`;

const ChangeImgButton = styled.button`
    width: 100px;
    height: 37px;
    margin-left: 360px;
    background-color: black;
    color: white;
    border: 1px solid black;
    cursor: pointer;
`;

const InfoWrapper = styled.div`
    width: 644px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 15px;
    gap: 10px;
`;

const InfoText  = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    border: 1px solid #D1D4D8;
    color: #b1b5b9;
    overflow-x: auto;

`;

const ProductNameInput = styled.input`
    width: 644px;
    height: 40px;
    border: none;
    padding: 12px 20px;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
`;
const InterestsWrapper = styled.div`
    width: 644px;
    height: 40px;
    // border: 1px solid black;
    display: flex;
    flex-direction: row;
    // flex-wrap: wrap;
    align-items: start;
    justify-content: center;
    cursor: pointer;
`;

const Interest = styled.div`
    width: 140px;
    height: 26px;
    margin-right: 10px;
    border-radius: 40px;
    background-color: ${(props) => (props.isActive ? "#000000" : "#FFFF")};
    color: ${(props) => (props.isActive ? "#FFFF" : "#000000")};
    border: 1px solid #D1D4D8;
    text-align: center;
    &: hover {
        background-color: gray;
    }
`;

const InterestClicked = styled.div`
    width: 140px;
    height: 26px;
    margin-right: 10px;
    border-radius: 40px;
    background-color: black;
    color: white;
    border: 1px solid #D1D4D8;
    text-align: center;
    // &: hover {
    //     background-color: gray;
    // }
`;

const SearchResultList = styled.div`
    display: grid;
    row-gap: 40px;
    column-gap: 20px;
    grid-template-columns: 150px 150px 150px 150px 120px;
`;

const SearchItem = styled.div`
    width: 120px;
`;

const ItemImageBox = styled.div`
    border-radius: 10px;
    background-color: rgb(244, 244, 244);
`;
const ItemImage = styled.img`
    width: 120px;
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
const Icon = styled.div`
    /* 아이콘 스타일 */
    margin-right: 5px;
`;

const Pagination = styled.div``;

const PageButton = styled.button`
    width: 35px;
    height: 35px;
    background-color: black;
    color: white;
    cursor: pointer;
`;