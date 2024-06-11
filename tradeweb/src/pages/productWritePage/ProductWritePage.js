import React from 'react';
import styled from "styled-components";
import ReactQuill from "react-quill";
import "quill/dist/quill.core.css";
import DropdownOptions from "../../components/common/DropdownOptions";
import plusIcon from "../../assets/plus.svg";

const ProductWritePage = () => {
    const data = {
        productOptions: ["의류", "전자제품"],
        productSellStatusOptions: ["새 상품", "중고 상품"],
    };

    const {
        productOptions,
        productSellStatusOptions,
    } = data;

     // 옵션 선택 시
    const handleOptionSelect = (option) => {
        console.log(option);
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


    return (
        <ContentLayout>
            <Wrapper>
                <h2>상품 등록</h2>
                <SaveButtonTopWrapper>
                    <SaveButton>저장</SaveButton>
                </SaveButtonTopWrapper>  
                <SubTitle>
                    <h3>상품 정보</h3>
                </SubTitle>
                <SubContentWrapper>
                    <ProductNameWrapper>
                        <ProductNameElement>상품명:</ProductNameElement>
                        <ProductNameInput type="text"  defaultValue="아디다스 반팔티"/>
                    </ProductNameWrapper>
                    <ProductNameWrapper>
                        <ProductNameElement>가격:</ProductNameElement>
                        <ProductNameInput type="text" defaultValue="56000"/>
                    </ProductNameWrapper>
                    <ProductNameWrapper>
                        <ProductNameElement>재고:</ProductNameElement>
                        <ProductNameInput type="text" defaultValue="10"/>
                    </ProductNameWrapper>
                    <OptionInputWrapper>
                        <OptionTitleTextElement>옵션명:</OptionTitleTextElement>
                        <OptionTextInput type="text" placeholder="옵션명을 입력하세요"/>
                        <button>옵션 내용 추가</button>
                    </OptionInputWrapper>
                    <OptionInputWrapper>
                        <OptionContentTitleElement>옵션 내용:</OptionContentTitleElement>
                        <OptionContentInput type="text" placeholder="옵션 내용을 입력하세요"/>
                    </OptionInputWrapper>
                    <InnerWrapper>
                        <ProductSellDateWrapper>
                            <SellStartDateWrapper>
                                    <DateStartText>판매 시작일:</DateStartText>
                                    <StartDateInput type="date" defaultValue="2024-06-07"/>
                            </SellStartDateWrapper>
                            <SellEndDateWrapper>
                                    <DateStartText>판매 종료일:</DateStartText>
                                    <EndDateInput type="date" defaultValue="2024-06-30"/>
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
                                    />
                                </DropwDownElementWrapper>
                                
                            </SellStartDateWrapper>
                            <SellStartDateWrapper>
                                <OptionTitleText>제품 상태</OptionTitleText>
                                <DropwDownElementWrapper>
                                    <DropdownOptions
                                        options={productSellStatusOptions}
                                        title="제품 상태 선택"
                                        onSelect={handleOptionSelect}
                                    />
                                </DropwDownElementWrapper>
                                
                            </SellStartDateWrapper>
                        </ProductSellDateWrapper>


                    </InnerWrapper>
                    {/* <ProductSellDateWrapper>
                        <SellStartDateWrapper>
                                <DateStartText>판매 시작일:</DateStartText>
                                <StartDateInput type="date" defaultValue="2024-06-07"/>
                        </SellStartDateWrapper>
                        <SellEndDateWrapper>
                                <DateStartText>판매 종료일:</DateStartText>
                                <EndDateInput type="date" defaultValue="2024-06-30"/>
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
                                />
                            </DropwDownElementWrapper>
                            
                        </SellStartDateWrapper>
                        <SellStartDateWrapper>
                            <OptionTitleText>제품 상태</OptionTitleText>
                            <DropwDownElementWrapper>
                                <DropdownOptions
                                    options={productSellStatusOptions}
                                    title="제품 상태 선택"
                                    onSelect={handleOptionSelect}
                                />
                            </DropwDownElementWrapper>
                            
                        </SellStartDateWrapper>
                    </ProductSellDateWrapper> */}
                    
                </SubContentWrapper>
                
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
                />

                <SubTitle>
                    <h3>상품 상세 설명</h3>
                </SubTitle>
                <ReactQuill  style={{ width: "1280px", height: "600px", margin: "4px", backgroundColor: "white", }}
                              modules={modules}  
                              placeholder="상품에 대한 상세설명을 작성해주세요!"  />
                <ImageWrapper>
                    <SubTitle><h3>이미지</h3></SubTitle>
                    <MainImage>
                        <img src="https://placehold.jp/200x200.png"/>
                    </MainImage>
                        <ImageInputWrapper>
                            <ImageButton>
                                <input
                                type="file"
                                accept="image/*"
                                multiple
                                // onChange={handleImageChange}
                                // style={{ display: "none" }}
                                // ref={fileInputRef}
                                // disabled={remainingfiles <= 0}
                                />
                                <PlusIcon />
                                <div>
                                {/* {files.length}/{maxfiles} */}
                                </div>
                            </ImageButton>
                            {/* <ImagePreviewWrapper>{renderfiles()}</ImagePreviewWrapper> */}
                    </ImageInputWrapper>
                </ImageWrapper>
                <SaveButtonWrapper>
                    <SaveButton>저장</SaveButton>
                </SaveButtonWrapper>  
            </Wrapper>
        </ContentLayout>
    );
};

export default ProductWritePage;

const ContentLayout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f7f2d2;
`;

const Wrapper = styled.div`
    width: 1280px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 120px;
`;

const SaveButtonTopWrapper = styled.div`
    width: 1280px;
    margin-top: 80px;
    display: flex;
    justify-content: end;
    background-color: #f7f2d2;
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
    margin-top: 40px;
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
    appearance: none; /* 기본 스타일 제거 */
    background-color: white;
    border: none;
    padding: 12px 20px;
    margin-bottom: 20px;
    cursor: pointer;
`;

const EndDateInput = styled.input`
    width: 483px;
    height: 24px;
    position: relative;
    appearance: none; /* 기본 스타일 제거 */
    background-color: white;
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
    // border: 1px solid red;
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
    background-color:#f0c556;
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
    background-color: #f7f2d2;
`;

const SaveButton = styled.button`
    width: 30%;
    height: 45px;
    margin-left: 32%;
    background-color: black;
    color: white;
    border-radius: 5px;
`;