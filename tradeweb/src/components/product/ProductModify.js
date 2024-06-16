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
    const [filesArray, setFiles] = useState([]);
    const [rawFiles, setRawFiles] = useState([]);
    const [isTextChanged, setText] = useState("");
    const [isInputChanged, setIsInputChanged] = useState(false);
    const [isCategoryChanged, setIsCategoryChanged] = useState("");
    const [isProductQuantityChanged, setIsProductQuantityChanged] = useState("");
    const [buttonName, setButtonName] = useState("저장");
    const [value, setValue] = useState('');
    const [inputs, setInputs] = useState({
        productName: '',
        productPrice: '',
        startDate: '',
        endDate: '',
        category: '',
        productQuality: '',
        description: '',
        files:'',
    });
    
    const token = localStorage.getItem("accessToken");
    const {productName, productPrice, startDate, endDate, category, description, productQuality, files} = inputs;

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
                    setFiles(response.data.imagePathUrl);
                })
               
            } catch (error) {
                console.error("요청 실패:", error);
            }
        };
        get();
    }, [productId]);



    useEffect(() => {
        setIsInputChanged(false);
        setButtonName("");
    }, inputs)

    const onChange = (e) => {
        const { value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
        setIsInputChanged(true);
        setButtonName("수정");
    };

    const RequillDescriptionChanged = (e) => {
        setText(e);
        setIsInputChanged(true);
        setButtonName("수정");
    }

    const fileInputRef = useRef(null);
    const maxfiles = 10;
    const remainingfiles = maxfiles - files.length;

    const data = {
        productOptions: ["의류", "전자제품"],
        productSellStatusOptions: ["미개봉 상품", "중고 상품"],
    };

    const {
        productOptions,
        productSellStatusOptions,
    } = data;

     // 옵션 선택 시
    const onSelect = (option) => {
        console.log(option);
        setIsCategoryChanged(option);
        setIsInputChanged(true);
        setButtonName("수정");
    };

    const onSelect2 = (option) => {
        console.log(option);
        setIsProductQuantityChanged(option)
        setIsInputChanged(true);
        setButtonName("수정");
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
        return filesArray.map((image, index) => (
          <ImagePreview key={index}>
            <img src={`${process.env.REACT_APP_IMAGE_URL}${image}`} alt={`Uploaded file ${index + 1}`} />
            <DeleteButton onClick={() => handleDeleteImage(index)} />
          </ImagePreview>
        ));
      };

      const onClickCancelButton = () => {
        navigate("/my-page");
      }

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
                    <ProductNameInput type="text" name="productName"  defaultValue={produtData.productName} onChange={onChange}/>
                </ProductNameWrapper>
                <ProductNameWrapper>
                    <ProductNameElement>가격:</ProductNameElement>
                    <ProductNameInput type="text" name="productPrice" defaultValue={produtData.price}  onChange={onChange}/>
                </ProductNameWrapper>
                <InnerWrapper>
                    <ProductSellDateWrapper>
                        <SellStartDateWrapper>
                                <DateStartText>판매 시작일:</DateStartText>
                                <StartDateInput type="date" name="startDate" defaultValue={produtData.startDate}  onChange={onChange}/>
                        </SellStartDateWrapper>
                        <SellEndDateWrapper>
                                <DateStartText>판매 종료일:</DateStartText>
                                <EndDateInput type="date" name="endDate" defaultValue={produtData.endDate}  onChange={onChange}/>
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
                                    defaultValue={produtData.category}
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
                                    defaultValue={isProductQuantityChanged}
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
                          ref={quillRef} placeholder="상품에 대한 상세설명을 작성해주세요!"   name="description" defaultValue={isTextChanged} value={produtData.description}  onChange={RequillDescriptionChanged}/>
            <ImageWrapper>
                <SubTitle><h3>이미지</h3></SubTitle>
                <MainImage>
                    <img src={`${process.env.REACT_APP_IMAGE_URL}${produtData.thumbnailUrl}`}/>
                    {/* {files.length > 0 && (
                        <img src={files[0]} alt="Main product" />
                    )} */}
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
                            name="files"
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
                <SaveButton onClick={onClickCancelButton}>취소</SaveButton>
                {isInputChanged &&
                     <SaveButton>수정</SaveButton>
                     

                }
               
            </SaveButtonWrapper>  
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

const OptionInputWrapper = styled.div`
    width: 1280px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const OptionContentTitleElement = styled.div`
    width:  160px;
    height: 30px;
    margin-top: 30px;
    margin-bottom: 10px;
    background-size: cover;
    // border: 1px solid green;
    cursor: pointer;
`;

const OptionTitleTextElement = styled.div`
    width:  52px;
    height: 30px;
    margin-right: 26px;
    margin-bottom: 10px;
    background-size: cover;
    // border: 1px solid blue;
    cursor: pointer;
`;

const OptionTitleText = styled.div`
    width:  90px;
    height: 30px;
    margin-top: 30px;
    margin-bottom: 10px;
    background-size: cover;
    // border: 1px solid black;
    cursor: pointer;
`;


const OptionTextInput = styled.input`
    width: 1060px;
    height: 44px;
    margin-right: 34px;
    border: none;   
    margin-bottom: 10px;
`;

const OptionContentInput = styled.input`
    width:  2600px;
    height: 44px;
    border: none; 
`;

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

const FileUploadButtonWrapper = styled.div`
    width: 200px;
    cursor: pointer;
`;

const FileUploadButton = styled.button`
    width: 200px;
    hieght: 45px;
    margin-top: 10px;
    background-color: black;
    color: white;
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