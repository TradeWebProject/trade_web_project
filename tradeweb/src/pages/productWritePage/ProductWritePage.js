import React from 'react';
import styled from "styled-components";
import ReactQuill from "react-quill";


const ProductWritePage = () => {
    const modules = {
        toolbar: {
            container: [
            ["image", "link"],
            [{ header: [1, 2, 3, 4, 5, false] }],
            ["bold", "underline", "italic", "strike" ,"color"],
            ['blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            ],
        },
    };
    return (
        <ContentLayout>
            <NavWrapper>
                <h1>Navbar</h1>  
            </NavWrapper>
            <Wrapper>
                <h1>상품 등록 페이지</h1>
                <div>
                    <div>상품명</div>
                    <input type="text" value="아디다스 반팔티"/>
                </div>
                <div>
                    <div>가격</div>
                    <input type="number" value="56000"/>
                </div>
                <div>
                    <div>수량</div>
                    <input type="number" value="10"/>
                </div>
                <div>
                    <div>판매 시작 날짜</div>
                    <input type="date" value="2024-06-07"/>
                </div>
                <div>
                    <div>판매 종료 날짜</div>
                    <input type="date" value="2024-06-30"/>
                </div>
                <div>
                    <div>썸네일 이미지</div>
                    <img src="https://placehold.jp/200x200.png"/>
                </div>
                <div>
                    <div>
                        <button type="button">
                            색상
                        </button>
                        <div>
                            <ul>
                                <li>핑크</li>
                                <li>블랙</li>
                                <li>베이지</li>
                            </ul>
                        </div>
                     </div>
                </div>
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
                <button>저장</button>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
                />

                <ReactQuill  style={{ width: "1230px", height: "600px" }}
                              modules={modules}   />
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

const NavWrapper = styled.div`
    width: 1230px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 1230px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
`;