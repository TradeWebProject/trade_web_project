import React, { useState, useRef } from 'react';
import styled from "styled-components";
import ReactQuill from "react-quill";
import axios from "axios";
import "quill/dist/quill.core.css";
import DropdownOptions from "../../components/common/DropdownOptions";
import plusIcon from "../../assets/plus.svg";
import deleteIcon from "../../assets/delete.svg";

const ProductRegister = () => {
    const [files, setFiles] = useState([]);
    const [rawFiles, setRawFiles] = useState([]);
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [productQuality, setProductQuality] = useState("");
    const [category, setCategory] = useState("");

    const fileInputRef = useRef(null);
    const maxfiles = 10;
    const remainingfiles = maxfiles - files.length;

    const data = {
        productOptions: ["의류", "전자기기", "가전", "문구", "도서", "신발", "여행용품", "스포츠"],
        productSellStatusOptions: ["새상품", "중고상품"],
    };

    const {
        productOptions,
        productSellStatusOptions,
    } = data;

     // 옵션 선택 시
    const handleOptionSelect = (option) => {
        console.log(option);
        setCategory(option);
    };

    // 옵션 선택 시
    const handleOptionSelect2 = (option) => {
        console.log(option);
        setProductQuality(option);
    };

    const RequillDescriptionChanged = (e) => {
        setDescription(e);
        console.log(description);
    };

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
        const files = e.target.files;
        const maxSize = 10 * 1024 * 1024; // 10MB

        const formData = new FormData();
        const newRawFiles = []; // 새로운 인코딩되지 않은 원본 파일을 저장하는 배열

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.size > maxSize) {
            alert("파일 크기는 10MB를 초과할 수 없습니다.");
            return;
            }
            formData.append("files", file); // FormData에는 인코딩된 파일을 추가
            newRawFiles.push(file); // newRawFiles 배열에는 인코딩되지 않은 원본 파일을 추가
        }

        setRawFiles((prevRawFiles) => [...prevRawFiles, ...newRawFiles]);

        const promises = Array.from(files).map((file) => {
            const reader = new FileReader();

            return new Promise((resolve, reject) => {
            reader.onload = (e) => {
                resolve(e.target.result);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
            });
        });

        Promise.all(promises)
            .then((results) => {
            setFiles((prevfiles) => {
                const newfiles = [...prevfiles, ...results];
                if (newfiles.length > 10) {
                return newfiles.slice(newfiles.length - 10);
                }

                return newfiles;
            });
            fileInputRef.current.value = null;
            })
            .catch((error) => {
            console.error("이미지를 읽는 동안 오류가 발생했습니다.", error);
            });
       };

       const handleDeleteImage = (index) => {
        const newFiles = [...files];
        const newRawFiles = [...rawFiles]; // rawFiles 복사
        newFiles.splice(index, 1); // 파일 삭제
        newRawFiles.splice(index, 1); // rawFiles에서도 삭제
        setFiles(newFiles); // 파일 상태 업데이트
        setRawFiles(newRawFiles); // rawFiles 상태 업데이트
      };

       const renderfiles = () => {
        return files.map((image, index) => (
          <ImagePreview key={index}>
            <img src={image} alt={`Uploaded file ${index + 1}`} />
            <DeleteButton onClick={() => handleDeleteImage(index)} />
          </ImagePreview>
        ));
      };

     
      const registerProduct = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const formData = new FormData();
          
          // FormData에 항목 추가
          formData.append("productName", productName);
          formData.append("price", price);
          formData.append("startDate", startDate);
          formData.append("endDate", endDate);
          formData.append("description", description);
          formData.append("productQuality", productQuality);
          formData.append("category", category);
          
          // 파일 크기 확인 및 추가
          const maxSize = 10 * 1024 * 1024; // 10MB
          rawFiles.forEach((file) => {
            if (file.size > maxSize) {
              alert("파일 크기는 10MB를 초과할 수 없습니다.");
              throw new Error("파일 크기 초과");
            }
            formData.append("files", file);
          });
      
          console.log(formData);
          // API 요청
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}products/register`, 
            formData, 
            {
              headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': `Bearer ${token}`,
              }
            }
          );
          console.log("응답 데이터:", response.data);
        } catch (error) {
          console.error("요청 실패:", error);
        }
      };

    return (
        <ContentLayout>
            <Wrapper>
                <h1>상품 등록</h1>
                <SubTitle>
                    <h2>상품 정보</h2>
                </SubTitle>
                <SubContentWrapper>
                    <ProductNameWrapper>
                        <ProductNameElement>상품명:</ProductNameElement>
                        <ProductNameInput type="text" placeholder='상품명을 입력하세요'  defaultValue={productName} onChange={(e) => setProductName(e.target.value)}/>
                    </ProductNameWrapper>
                    <ProductNameWrapper>
                        <ProductNameElement>가격:</ProductNameElement>
                        <ProductNameInput type="text" placeholder='상품 가격을 입력하세요' defaultValue={price} onChange={(e) => setPrice(e.target.value)}/>
                    </ProductNameWrapper>
                    <InnerWrapper>
                        <ProductSellDateWrapper>
                            <SellStartDateWrapper>
                                    <DateStartText>판매 시작일:</DateStartText>
                                    <StartDateInput type="date" placeholder='판매 시작일을 선택해주세요' defaultValue={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                            </SellStartDateWrapper>
                            <SellEndDateWrapper>
                                    <DateStartText>판매 종료일:</DateStartText>
                                    <EndDateInput type="date" placeholder='판매 종료일을 선택해주세요' defaultValue={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                            </SellEndDateWrapper>
                        </ProductSellDateWrapper>
                        <ProductSellDateWrapper>
                            <SellStartDateWrapper>
                                <OptionTitleText>카테고리</OptionTitleText>
                                <DropwDownElementWrapper>
                                    <DropdownOptions
                                        options={productOptions}
                                        title="카테고리 선택"
                                        onSelect={handleOptionSelect}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </DropwDownElementWrapper>
                                
                            </SellStartDateWrapper>
                            <SellStartDateWrapper>
                                <OptionTitleText>제품 상태</OptionTitleText>
                                <DropwDownElementWrapper>
                                    <DropdownOptions
                                        options={productSellStatusOptions}
                                        title="제품 상태 선택"
                                        onSelect={handleOptionSelect2}
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
                              placeholder="상품에 대한 상세설명을 작성해주세요!" 
                              onChange={RequillDescriptionChanged} />
                <ImageWrapper>
                    <SubTitle><h3>이미지</h3></SubTitle>
                    <MainImage>
                        {/* <img src="https://placehold.jp/200x200.png"/> */}
                        {files.length > 0 && (
                            <img src={files[0]} alt="Main product" />
                        )}
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
                                disabled={remainingfiles <= 0}
                                />
                                <PlusIcon />
                                <div>
                                    {files.length}/{maxfiles}
                                </div>
                            </ImageButton>
                            <ImagePreviewWrapper>{renderfiles()}</ImagePreviewWrapper>
                    </ImageInputWrapper>
                </ImageWrapper>
                <SaveButtonWrapper>
                    <SaveButton onClick={registerProduct}>저장</SaveButton>
                </SaveButtonWrapper>  
            </Wrapper>
        </ContentLayout>
    );
};

export default ProductRegister;

const ContentLayout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // background-color: #f7f2d2;
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

// const OptionInputWrapper = styled.div`
//     width: 1280px;
//     display: flex;
//     align-items: center;
//     margin-bottom: 10px;
// `;

// const OptionContentTitleElement = styled.div`
//     width:  160px;
//     height: 30px;
//     margin-top: 30px;
//     margin-bottom: 10px;
//     background-size: cover;
//     // border: 1px solid green;
//     cursor: pointer;
// `;

// const OptionTitleTextElement = styled.div`
//     width:  52px;
//     height: 30px;
//     margin-right: 26px;
//     margin-bottom: 10px;
//     background-size: cover;
//     // border: 1px solid blue;
//     cursor: pointer;
// `;

const OptionTitleText = styled.div`
    width:  90px;
    height: 30px;
    margin-top: 30px;
    margin-bottom: 10px;
    background-size: cover;
    // border: 1px solid black;
    cursor: pointer;
`;


// const OptionTextInput = styled.input`
//     width: 1060px;
//     height: 44px;
//     margin-right: 34px;
//     border: none;   
//     margin-bottom: 10px;
// `;

// const OptionContentInput = styled.input`
//     width:  2600px;
//     height: 44px;
//     border: none; 
// `;

const InnerWrapper = styled.div`
    width: 1277px;
    height: 150px;
    // background-color:#f0c556;
`;

const DropwDownElementWrapper = styled.div`
    width: 524px;
    height: 24px;
    margin-left: 20px;
    
`;

// const FileUploadButtonWrapper = styled.div`
//     width: 200px;
//     cursor: pointer;
// `;

// const FileUploadButton = styled.button`
//     width: 200px;
//     hieght: 45px;
//     margin-top: 10px;
//     background-color: black;
//     color: white;
// `;

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

const PlusIcon = styled.div`
  width: 15px;
  height: 15px;
  background-image: url(${plusIcon});
  background-size: cover;
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