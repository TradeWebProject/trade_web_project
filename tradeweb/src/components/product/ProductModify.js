import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import DropdownOptions from "../../components/common/DropdownOptions";
import plusIcon from "../../assets/plus.svg";
import styled from "styled-components";
import axios from "axios";
import ReactQuill from "react-quill";
import "quill/dist/quill.core.css";
import deleteIcon from "../../assets/delete.svg";

const ProductModify = () => {
    const navigate = useNavigate();
    const quillRef = useRef();
    const {productId} = useParams();
    const [produtData, setProductData] = useState("");
    const [filesArray, setFilesArray] = useState([]);
    const [password, setPassword] = useState("");
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [productQuality, setProductQuality] = useState("");
    const [option ,setIsProductQualityyOption] = useState("");
    const [category, setCategory] = useState("");
    const [UpdatedFiles, setUpdatedFiles]= useState([]);
    const [serverFileLength, setServerFileLength] = useState(0);
    const fileInputRef = useRef(null);
    let prevFilesLength = 0;
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
                    const data = response.data;
                    setProductData(data);
                    setProductName(data.productName);
                    setPrice(data.price);
                    setStartDate(data.startDate);
                    setEndDate(data.endDate);
                    setCategory(data.category);
                    setProductQuality(data.productQuality);
                    setDescription(data.description);
                    setFilesArray(data.imagePathUrl);
                    
                    setServerFileLength(data.imagePaths.length);
                    prevFilesLength = data.imagePaths.length;
                    console.log("서버에서 가져온 파일 개수: ", prevFilesLength);
                })
               
            } catch (error) {
                console.error("요청 실패:", error);
            }
        };
        get();
    }, [productId]);

    const data = {
        productOptions: ["의류", "전자기기", "가전", "문구", "도서", "신발", "여행용품", "스포츠"],
        productSellStatusOptions: ["새상품", "중고상품"],
    };

    const {
        productOptions,
        productSellStatusOptions,
    } = data;

     // 옵션 선택 시
    const onSelect = (option) => {
        console.log(option);
        setCategory(option);
    };

    const onSelect2 = (option) => {
        console.log(option);
        setProductQuality(option);
        setIsProductQualityyOption(option)
    }

    const modules = {
        toolbar: {
            container: [
            ["image", "link"],
            [{ header: [1, 2, 3, 4, 5, false] }],
            ["bold", "underline", "italic", "strike" ,"color"],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            ],
        },
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setUpdatedFiles((prevUpdatedFiles) => [...prevUpdatedFiles, ...files]); // UpdatedFiles에 원본 파일 추가
        const fileReaders = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders)
            .then((fileUrls) => {
                setFilesArray((prevFiles) => [...prevFiles, ...fileUrls]);
            })
            .catch((err) => console.error("Error reading file:", err));
    };

    const renderFiles = () => { // Changed renderfiles to camelCase
        return filesArray.map((imageFile, index) => (
            <ImagePreview key={index}>
                {index < serverFileLength ? (
                    <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${imageFile}`}
                        alt={`Uploaded file ${index}`}
                    />
                ) : (
                    <img src={imageFile} alt={`Uploaded file ${index}`} />
                )}
                <DeleteButton onClick={() => handleDeleteImage(index)} />
            </ImagePreview>
        ));
    };

    const handleDeleteImage = (index) => {
        setFilesArray((prevFiles) => {
            if (index < 0 || index >= prevFiles.length) {
                return prevFiles;
            }
            return prevFiles.filter((_, i) => i !== index);
        });

        setUpdatedFiles((prevUpdatedFiles) => {
            const serverImages = prevUpdatedFiles.slice(0, serverFileLength); // 서버 이미지
            const newImages = prevUpdatedFiles.slice(serverFileLength); // 새 이미지

            if (index < serverFileLength) {
                // 서버 이미지 삭제
                serverImages.splice(index, 1);
            } else {
                // 새 이미지 삭제
                newImages.splice(index - serverFileLength, 1);
            }

            return [...serverImages, ...newImages];
        });
    };

    const onClickCancelButton = () => {
    navigate("/my-page");
    }

    const onClickUpdateButton = () => {
        console.log("여기");
        try {
            const form = new FormData();
            form.append("email", localStorage.getItem("email"));
            form.append("password", password);
            form.append("productName", productName);
            form.append("price", price);
            form.append("startDate", startDate);
            form.append("endDate", endDate);
            form.append("description", description);
            form.append("productQuality", productQuality);
            form.append("category", category);
            form.append("productId", productId);
            form.append("files", UpdatedFiles); // Changed to use camelCase

            UpdatedFiles.forEach((file) => {
                form.append("files", file);
            });
            console.log("수정된 데이터: ", form);
            axios.put(`${process.env.REACT_APP_API_URL}products/${productId}`,
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`,
                    }
                }
            ).then(function (response) {
                console.log("응답 데이터:", response.data);
            })

        } catch (error) {
            console.error("요청 실패:", error);
        }
    };

    return (
    <ContentLayout>
        <Wrapper>
            <h1>상품 조회</h1>
            <SubTitle>
                <h2>상품 정보</h2>
            </SubTitle>
            <SubContentWrapper>
                <ProductNameWrapper>
                    <ProductNameElement>상품명:</ProductNameElement>
                    <ProductNameInput type="text" name="productName"  value={productName} onChange={(e) => setProductName(e.target.value)}/>
                </ProductNameWrapper>
                <ProductNameWrapper>
                    <ProductNameElement>가격:</ProductNameElement>
                    <ProductNameInput type="text" name="price" value={price}  onChange={(e) => setPrice(e.target.value)}/>
                </ProductNameWrapper>
                <InnerWrapper>
                    <ProductSellDateWrapper>
                        <SellStartDateWrapper>
                                <DateStartText>판매 시작일:</DateStartText>
                                <StartDateInput type="date" name="startDate" value={startDate}  onChange={(e) => setStartDate(e.target.value)}/>
                        </SellStartDateWrapper>
                        <SellEndDateWrapper>
                                <DateStartText>판매 종료일:</DateStartText>
                                <EndDateInput type="date" name="endDate" value={endDate}  onChange={(e) => setEndDate(e.target.value)}/>
                        </SellEndDateWrapper>
                    </ProductSellDateWrapper>
                    <ProductSellDateWrapper>
                        <SellStartDateWrapper>
                            <OptionTitleText>카테고리</OptionTitleText>
                            <DropwDownElementWrapper>
                                <DropdownOptions
                                    name="category"
                                    options={productOptions}
                                    title={produtData.category}
                                    onSelect={onSelect}
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </DropwDownElementWrapper>
                            
                        </SellStartDateWrapper>
                        <SellStartDateWrapper>
                            <OptionTitleText>제품 상태</OptionTitleText>
                            <DropwDownElementWrapper>
                                <DropdownOptions
                                    name="productQuality"
                                    options={productSellStatusOptions}
                                    title={produtData.productQuality}
                                    onSelect={onSelect2}
                                    value={productQuality}
                                    onChange={(e) => setProductQuality(e.target.value)}
                                />
                            </DropwDownElementWrapper>
                            
                        </SellStartDateWrapper>
                    </ProductSellDateWrapper>
                </InnerWrapper>
            </SubContentWrapper>
            
            <link
                rel="stylesheet"
                href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
            />

            <SubTitle>
                <h2>상품 상세 설명</h2>
            </SubTitle>
            <ReactQuill  style={{ width: "1280px", height: "600px", margin: "4px", backgroundColor: "white", }}
                         modules={modules}  
                         ref={quillRef} 
                         placeholder="상품에 대한 상세설명을 작성해주세요!"   
                         name="description" 
                         value={description}
                         onChange={setDescription}/>
            <ImageWrapper>
                <SubTitle><h3>이미지</h3></SubTitle>
                <MainImage>
                    <img src={`${process.env.REACT_APP_IMAGE_URL}${produtData.thumbnailUrl}`}/>

                </MainImage>
                    <ImageInputWrapper>
                        <ImageButton>
                            <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            disabled={filesArray >= 5}
                            />
                            <PlusIcon onClick={() => fileInputRef.current.click()}/>
                            <div>
                                {filesArray.length}/5
                            </div>
                        </ImageButton>
                        <ImagePreviewWrapper> {renderFiles()}</ImagePreviewWrapper>
                </ImageInputWrapper>
            </ImageWrapper>
            <SaveButtonWrapper>
                <SaveButton onClick={onClickCancelButton}>취소</SaveButton>
            </SaveButtonWrapper>  
            <InfoWrapper>
                <div>비밀번호 확인</div>
                <ProductNameInput type="text" onChange={(e) => setPassword(e.target.value)} placeholder="프로필 수정을 위해 비밀번호를 입력한 후 프로필 저장버튼을 눌러주세요"/>
            </InfoWrapper>
            <UpdateButton onClick={onClickUpdateButton}>수정</UpdateButton>
        </Wrapper>
    </ContentLayout>
    );
};

export default ProductModify;

const ContentLayout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Wrapper = styled.div`
    width: 1280px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 120px;
`;

const SubContentWrapper  = styled.div`
    width: 1280px;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
`;

const SubTitle = styled.div`
    width: 1280px;
    hieght: 45px;
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
`;

const ProductNameWrapper = styled.div`
    width: 1280px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const ProductNameElement = styled.div`
    width: 70px;
    height: 30px;
    margin-right: 10px;
`;

const ProductNameInput = styled.input`
    width: 1200px;
    height: 24px;
    border: none;
    padding: 12px 20px;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
`;

const ProductSellDateWrapper = styled.div`
    width: 1280px;
    display: flex;
`;

const SellStartDateWrapper = styled.div`
    width: 1140px;
    display: flex;
`;

const SellEndDateWrapper = styled.div`
    width: 1140px;
    display: flex;
`;

const DateStartText = styled.div`
    width: 110px;
    height: 24px;
    margin-right: 4px;
    margin-top: 14px;
    background-size: cover;
    cursor: pointer;
`;

const StartDateInput = styled.input`
    width: 480px;
    height: 24px;
    margin-right: 4px;
    position: relative;
    appearance: none;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
    border: none;
    padding: 12px 20px;
    margin-bottom: 20px;
    cursor: pointer;
`;

const EndDateInput = styled.input`
    width: 483px;
    height: 24px;
    position: relative;
    appearance: none;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
    border: none;
    padding: 12px 20px;
    margin-bottom: 20px;
    cursor: pointer;
`;

const OptionTitleText = styled.div`
    width:  90px;
    height: 30px;
    margin-top: 30px;
    margin-bottom: 10px;
    background-size: cover;
    cursor: pointer;
`;

const InnerWrapper = styled.div`
    width: 1277px;
    height: 150px;
`;

const DropwDownElementWrapper = styled.div`
    width: 524px;
    height: 24px;
    margin-left: 20px;    
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MainImage = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
  margin-bottom: 7px;
  background-color: #f4f4f4;
  img {
    width: 400px;
    height: 400px;
  }
`;

const ImagePreviewWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
`;

const ImagePreview = styled.div`
  display: flex;
  position: relative;
  width: 55px;
  height: 55px;
  border: 1px solid #ccc;
  margin-left: 7px;
  background-color: #f4f4f4;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ImageInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 405px;
  height: 80px;
  padding: 10px 0 10px 0;
  overflow-x: scroll;
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

const PlusIcon = styled.img.attrs({
    src: plusIcon,
})`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const SaveButtonWrapper = styled.div`
    width: 1280px;
    margin-top: 80px;
    display: flex;
    justify-content: center;
`;

const SaveButton = styled.button`
    width: 10%;
    height: 45px;
    margin-left: 32%;
    background-color: black;
    color: white;
    border-radius: 5px;
    cursor:pointer;
`;


const UpdateButton = styled.button`
    width: 10%;
    height: 45px;
    margin-left: 32%;
    background-color: black;
    color: white;
    border-radius: 5px;
    cursor:pointer;
`;

const InfoWrapper = styled.div`
    width: 644px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 15px;
    gap: 10px;
`;


const DeleteButton = styled.button`
  width: 15px;
  height: 15px;
  position: absolute;
  top: -7px;
  right: -7px;
  background-color: transparent;
  background-image: url(${deleteIcon});
  background-size: cover;
  cursor: pointer;
  border: none;
`;