import React from 'react';
import styled from "styled-components";
import ReactQuill from "react-quill";
import "quill/dist/quill.core.css";

const ProductWritePage = () => {
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

    const modules2 = {
        toolbar: {
            container: [
            // ["image", "link"],
            // [{ header: [1, 2, 3, 4, 5, false] }],
            // ["bold", "underline", "italic", "strike" ,"color"],
            [
                { list: 'ordered' },
                // { list: 'bullet' },
                // { indent: '-1' },
                // { indent: '+1' },
            ],
            // ['blockquote', 'code-block'],
            // [{ 'color': [] }, { 'background': [] }],
            ],
        },
    };

    return (
        <ContentLayout>
            <Wrapper>
                <h2>상품 등록</h2>
                <SubTitle>
                    <h3>상품 정보</h3>
                </SubTitle>
                <ProductNameWrapper>
                    <ProductNameElement>상품명:</ProductNameElement>
                    <ProductNameInput type="text" value="아디다스 반팔티"/>
                </ProductNameWrapper>
                <ProductInfoWrapper>
                    <div>
                        <div>썸네일 이미지</div>
                        <img src="https://placehold.jp/200x200.png"/>
                        <FileUploadButtonWrapper>
                            <FileUploadButton>파일업로드</FileUploadButton>
                        </FileUploadButtonWrapper>
                        
                    </div>
                    <div>
                        <div>
                            <div>가격</div>
                            <Input type="number" value="56000"/>
                        </div>
                        <div>
                            <div>재고</div>
                            <Input type="number" value="10"/>
                        </div>
                        <div>
                            <div>판매 시작 날짜</div>
                            <Input type="date" value="2024-06-07"/>
                        </div>
                        <div>
                            <div>판매 종료 날짜</div>
                            <Input type="date" value="2024-06-30"/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <button type="button">
                                    카테고리
                                </button>
                                <div>
                                    <ul>
                                        <li>의류</li>
                                        <li>전자제품</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <button type="button" >
                                    제품 상태를 선택하세요
                                </button>
                                <div>
                                    <ul>
                                        <li>미개봉</li>
                                        <li>약간 사용감 있음</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <button type="button">
                                    메인1
                                </button>
                                <div>
                                    <ul>
                                        <li>서브옵션1-1</li>
                                        <li>서브옵션1-2</li>
                                        <li>서브옵션1-3</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <button type="button">
                                    메인2
                                </button>
                                <div>
                                    <ul>
                                        <li>서브옵션2-1</li>
                                        <li>서브옵션2-2</li>
                                        <li>서브옵션2-3</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </ProductInfoWrapper>
                
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
                />

                <SubTitle>
                    <h3>상품 옵션</h3>
                </SubTitle>
                <ReactQuill  style={{ width: "1280px", height: "500px", margin: "4px" }}
                              modules={modules2}  
                              placeholder="상품에 대한 옵션을 등록해주세요"  />



                <SubTitle>
                    <h3>상품 상세 설명</h3>
                </SubTitle>
                <ReactQuill  style={{ width: "1280px", height: "600px", margin: "4px" }}
                              modules={modules}  
                              placeholder="상품에 대한 상세설명을 작성해주세요!"  />
                <SaveButtonWrapper>
                    <SaveButton>저장</SaveButton>
                </SaveButtonWrapper>              
                <TextWrapper>
                    <TextCol>
                        Footer
                    </TextCol>
                </TextWrapper>
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
`;

const Wrapper = styled.div`
    width: 1280px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 120px;
    // border: 1px solid red;
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
    // border: 1px solid black;
`;

const ProductNameElement = styled.div`
    margin-right: 10px;
`;

const ProductNameInput = styled.input`
    width: 1200px;
    height: 36px;
`;

const ProductInfoWrapper = styled.div`
    width: 1280px;
    height: fit-content;
    margin-top: 20px;
    margin-bottom: 40px;
    // border: 1px solid blue;
    display: flex;
    justify-content: flex-start;
    gap: 200px;
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


const SaveButtonWrapper = styled.div`
    width: 1280px;
    margin-top: 80px;
    // background-color: gray;
`;

const SaveButton = styled.button`
    width: 100%;
    height: 45px;
    background-color: black;
    color: white;
    border-radius: 5px;
`;

const TextWrapper = styled.div`
  display: flex;
`;

const TextCol = styled.div`
    margin-top: 100px;
`;

const Input  = styled.input`
    height: 36px;

`;