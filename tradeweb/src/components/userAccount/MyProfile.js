import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import axios from "axios";
import { Box } from "@mui/material";

import plusIcon from "../../assets/plus.svg";
import profile from "../../assets/profile.svg";

const MyProfile = () => {
    const [responseUserProfileData, setResponseUserProfileData] = useState("");
    const [profileUpdateStatus, setProfileUpdateStatus] = useState(false);
    const [userInterestsArray, setUserInterestsArray] = useState([]);
    const [responseData, setResponseData] = useState("");
    const [ImageUpdateStatus, setImageUpdateStatus] = useState(false);
    const [Image, setImage] = useState(profile);
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

    const interestsOptions = [
        { id: "전자기기", label: "전자기기" },
        { id: "의류", label: "의류" },
        { id: "가전", label: "가전" },
        { id: "문구", label: "문구" },
        { id: "도서", label: "도서" },
        { id: "신발", label: "신발" },
        { id: "여행용품", label: "여행용품" },
        { id: "스포츠", label: "스포츠" },
    ];

    const [isSelectedIndex, setSelectedIndex] = useState([]);
    const [nickname, setNickName] = useState("");
    const [phone, setPhone] = useState("");
    const [interests, setInterests] = useState([]);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        async function get() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}users/${userId}`, {
                    headers: {
                        'Content-Type': "multipart/form-data",
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("응답 데이터:", response.data);
                setResponseUserProfileData(response.data);
                setUserInterestsArray(response.data.userInterests);
            } catch (error) {
                console.error("요청 실패:", error);
            }
        };
        if (userId && token) {
            get();
        }
    }, [userId, token]);

    const profileUpdateOnClick = () => {
        setProfileUpdateStatus(true);
    };

    const handleImageChange = (e) => {
        setImageUpdateStatus(true);
        setFormData((prevData) => ({
            ...prevData,
            userImg: e.target.files[0],
        }));
        alert("프로필 사진이 변경 되었습니다.");
    };

    const handleClicked = (interestId) => {
        console.log("interestId: ", interestId);
        if (!interests.includes(interestId)) {
            setSelectedIndex(interestId);
            setInterests([...interests, interestId]);
        } else {
            setInterests(interests.filter(id => id !== interestId));
        }
    };

    const handleProfileUpdate = () => {
        update();
    };

    const update = async () => {
        try {
            const form = new FormData();
            form.append("email", email);
            form.append("password", password);
            form.append("nickname", nickname);
            form.append("phone", phone);
            form.append("interests", interests.join(','));
            form.append("userImg", formData.userImg);
            console.log("수정된 데이터: ");
            for (let [key, value] of form.entries()) {
                console.log(key + ", " + value);
            }

            const response = await axios.put(`${process.env.REACT_APP_API_URL}users/edit/${userId}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log("응답 데이터:", response.data.products);
            alert("프로필 수정이 완료 되었습니다.");
            const productsArray = response.data.products;
            setResponseData(productsArray);
        } catch (error) {
            console.error("요청 실패:", error);
        }
    };

    
  
    return (
        <Box sx={{ p: 3 }}>
        {!profileUpdateStatus ? (
            <Container>
                <Title>프로필</Title>
                <ProfileContainer>
                    <ProfileImage src={`${process.env.REACT_APP_IMAGE_URL}${responseUserProfileData.user_img}`} alt="profile" />
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
                        {interestsOptions.map((interest) => (
                            <Interest
                                key={interest.id}
                                isActive={userInterestsArray.includes(interest.id)}
                            >
                                {interest.label}
                            </Interest>
                        ))}
                    </InterestsWrapper>
                </InfoWrapper>
            </Container>
        ) : (
            <Container>
                <Title>프로필 수정</Title>
                <ProfileContainer>
                    {!ImageUpdateStatus ? (
                        <ProfileImage src={`${process.env.REACT_APP_IMAGE_URL}${responseUserProfileData.user_img}`} alt="profile" />
                    ) : (
                        <ProfileImage src={URL.createObjectURL(formData.userImg)} alt="profile" />
                    )}
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
                    <ProductNameInput
                        type="text"
                        onChange={(e) => setNickName(e.target.value)}
                        defaultValue={responseUserProfileData.user_nickname}
                    />
                </InfoWrapper>
                <InfoWrapper>
                    <div>전화번호</div>
                    <ProductNameInput
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                        defaultValue={responseUserProfileData.user_phone}
                    />
                </InfoWrapper>
                <InfoWrapper>
                    <div>관심사</div>
                    <InterestsWrapper>
                        {interestsOptions.map((interest) => (
                            <Interest
                                key={interest.id}
                                isActive={interests.includes(interest.id)}
                                onClick={() => handleClicked(interest.id)}
                            >
                                {interest.label}
                            </Interest>
                        ))}
                    </InterestsWrapper>
                </InfoWrapper>
                <InfoWrapper>
                    <div>비밀번호 확인</div>
                    <ProductNameInput
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="프로필 수정을 위해 비밀번호를 입력한 후 프로필 저장버튼을 눌러주세요"
                    />
                </InfoWrapper>
            </Container>
        )}

        
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
    display: flex;
    flex-direction: row;
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
`;

