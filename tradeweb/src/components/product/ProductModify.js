import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import DropdownOptions from "../../components/common/DropdownOptions";
import plusIcon from "../../assets/plus.svg";
import styled from "styled-components";
import axios from "axios";
import ReactQuill from "react-quill";
import "quill/dist/quill.core.css";
import deleteIcon from "../../assets/delete.svg";
import Modal2 from "../common/modal2/Modal2";

const ProductModify = ({children}) => {
    const navigate = useNavigate();
    const quillRef = useRef();
    const {productId} = useParams();
    const [produtData, setProductData] = useState("");
    const [filesArray, setFilesArray] = useState([]);
    const [rawFiles, setRawFiles] = useState([]);
    const [isTextChanged, setText] = useState("");
    const [isInputChanged, setIsInputChanged] = useState(false);
    const [isCategoryChanged, setIsCategoryChanged] = useState("");
    const [isProductQuantityChanged, setIsProductQuantityChanged] = useState("");
    const [ImageUpdateStatus, setImageUpdateStatus] = useState(false); 
    const [buttonName, setButtonName] = useState("저장");
    const [password, setPassword] = useState("");
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [productQuality, setProductQuality] = useState("");
    const [category, setCategory] = useState("");
    const [UpdatedFiles, setUpdatedFiles]= useState([]);
    const [hasFile, setHasFile] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [serverFileLength, setServerFileLength] = useState(0);
    let prevFilesLength = 0;
    let newRawFiles = []; // 새로운 인코딩되지 않은 원본 파일을 저장하는 배열
  
    
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
                    setProductName(response.data.productName);
                    setFilesArray(response.data.imagePathUrl);
                    setDescription(response.data.description);
                    setPrice(response.data.price);
                    setStartDate(response.data.startDate);
                    setEndDate(response.data.endDate);
                    console.log("files: ", filesArray);
                    prevFilesLength =  response.data.imagePaths.length;
                    setServerFileLength(prevFilesLength);
                    console.log("최초: ", prevFilesLength);
                })
               
            } catch (error) {
                console.error("요청 실패:", error);
            }
        };
        get();
    }, [productId]);

    useEffect(() => {

    })

    const fileInputRef = useRef(null);
    const maxfiles = 10;

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
        setIsCategoryChanged(option);
        setIsInputChanged(true);
        setButtonName("수정");
    };

    const onSelect2 = (option) => {
        console.log(option);
        setProductQuality(option);
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

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (file.size > maxSize) {
                alert("파일 크기는 10MB를 초과할 수 없습니다.");
                return;
            }
        
            formData.append("files",  file); // FormData에는 인코딩된 파일을 추가
            newRawFiles.push(file); // newRawFiles 배열에는 인코딩되지 않은 원본 파일을 추가
            setHasFile(true);
        }

        setUpdatedFiles([...filesArray, ...newRawFiles]);
        console.log("서버에서 가져온 파일 개수: ", filesArray.length);
        prevFilesLength = filesArray.length;
        console.log("서버에서 가져온 파일 개수: ",prevFilesLength);
        console.log("새로 추가한 파일 개수: ", newRawFiles.length);

        const promises = Array.from(files).map((file) => {
           console.log("file: " , file);
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
        setFilesArray((prevfiles) => {
          const newfiles = [...prevfiles, ...results];
          prevFilesLength =  prevfiles.length;
          console.log("서버에서 가져온 파일 개수: ", prevfiles.length );
          if (newfiles.length > 10) {
            return newfiles.slice(newfiles.length - 10);
          }

          return newfiles;
        });
        console.log(fileInputRef , "fileInputRef");
        fileInputRef.current.value = null;
      })
      .catch((error) => {
        console.error("이미지를 읽는 동안 오류가 발생했습니다.", error);
      });
    };

       
    const renderfiles = () => {
        prevFilesLength = filesArray.length;
        return filesArray.map((imageFile, index) => (
           <ImagePreview key={index}>
             {(index < serverFileLength)  ? <img src={`${process.env.REACT_APP_IMAGE_URL}${imageFile}`} alt={`Uploaded file ${index}`} /> :  <img src={imageFile} alt={`Uploaded file ${index}`} />}    
            <DeleteButton onClick={() => handleDeleteImage(index)} />
          </ImagePreview>
        ));
    };

    const handleDeleteImage = (index) => {
        const newFiles = [...filesArray];
        console.log("1. : " + newFiles);
        const newRawFiles = [...rawFiles]; // rawFiles 복사
        newFiles.splice(index, 1); // 파일 삭제
        console.log(newFiles);
        newRawFiles.splice(index, 1); // rawFiles에서도 삭제
        setFilesArray(newFiles); // 파일 상태 업데이트
        setUpdatedFiles(newRawFiles); // rawFiles 상태 업데이트
    };

      const onClickCancelButton = () => {
        navigate("/my-page");
      }

      const onClickUpdateButton = () => {
        try {
            
            const form = new FormData();
            form.append("email", localStorage.getItem("email"));
            form.append("password", password);
            form.append("productName", productName);
            form.append("price",price);
            form.append("startDate", startDate);
            form.append("endDate", endDate);
            form.append("description", description);
            form.append("productQuality", productQuality);
            form.append("category",category);

            UpdatedFiles.forEach((file) => {
                form.append("files", file);
            });
          
            const response = axios.put(`${process.env.REACT_APP_API_URL}products/${productId}`,
                      form,
                      {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            'Authorization': `Bearer ${token}`,
                        }
                      }
            ).then(function (response) {
                if (response.status === 200) {
                    console.log("응답 데이터:", response.data);
                    alert("상품이 수정되었습니다.");
                    setModalOpen(true);
                }
                
            })
           
        } catch (error) {
            console.error("요청 실패:", error);
        }
      };

      const handleButtonCloseClick = (value) => {
        setModalOpen(false);
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
                                options={["의류", "전자기기", "가전", "문구", "도서", "신발", "여행용품", "스포츠"]}
                                title={produtData?.category || "카테고리 선택"}
                                onSelect={setCategory}
                                value={category}
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
                    <ImagePreviewWrapper>{renderfiles()}</ImagePreviewWrapper>
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
            {modalOpen && (
                        <Modal2 onOk={handleButtonCloseClick} onCancel={handleButtonCloseClick} onClose={handleButtonCloseClick} >
                            <h1>프로필 정보가 수정되었습니다.</h1>
                            <p>프로필 페이지로 이동됩니다</p>

                    </Modal2>
                    )}
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