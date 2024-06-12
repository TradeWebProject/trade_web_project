import React, { useState,  useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import DropdownOptions from "../common/DropdownOptions";
import heartIcon from "../../assets/heart.svg";
import profile from "../../assets/profile.svg";
import rightarrow from "../../assets/rightarrow.svg";
import { IoIosStarOutline } from "react-icons/io";
import { LuThumbsUp } from "react-icons/lu";
import ChatList from "../chatlist/ChatList";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";


const Detail = () => {
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const [isChatVisible, setChatVisible] = useState(false);
  const [isPurchased, setIsPurchased] = useState(true);
  const [isClicked, setClicked] = useState([false, false, false, false, false]);
  const [isLiked, setLiked] = useState(false);

  // 별을 5개로 표현하기 위한 더미 배열
  const array = [0, 1, 2, 3, 4];

 


  // 임의의 데이터 정의
  const data = {
    image: "https://via.placeholder.com/700x448",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.",
    userImage: profile,
    userName: "아이머그컵",
    productTitle: "🔥커스텀 일러스트 자수 커플 반팔티 티셔츠",
    productLikes: 271,
    productStars: 4.5,
    productStarsCount: 12,
    productManagersThumbCount: 4.5,
    productManagerThumbCount: 15,
    productOptions: ["S", "M", "L", "XL"],
  };

  const reviewData = [
    {
        files: profile,
        nickName: "nickname",
        clickedStarNum: 4,
        thumbRate: 5,
        reviewContent: "색이 예쁘고 발이 편해요 ",
        date: "2024.06.08",
        productId: 2,
    },
    {
        files: profile,
        nickName: "nickname2",
        clickedStarNum: 5,
        thumbRate: 5,
        reviewContent: "바로 구매했는데 ",
        date: "2024.06.07",
        productId: 2,
    },
    {
        files: profile,
        nickName: "nickname3",
        clickedStarNum: 4,
        thumbRate: 5,
        reviewContent: "색이 예쁘고 발이 편해요",
        productManagerReviewContent: "채팅을 통해 상품에 대한 많은 정보를 얻을 수 있었어요.",
        date: "2024.06.06",
        productId: 2,
    },
    {
        files: profile,
        nickName: "nickname4",
        clickedStarNum: 4,
        thumbRate: 4,
        reviewContent: "추천",
        productManagerReviewContent: "바로 구매 했습니다",
        date: "2024.06.05",
        productId: 2,
    },
    {
        files: profile,
        nickName: "nickname5",
        clickedStarNum: 4,
        thumbRate: 5,
        reviewContent: "색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...",
        productManagerReviewContent: "바로 구매 했습니다",
        date: "2024.06.05",
        productId: 2,
    },
    {
        files: profile,
        nickName: "nickname6",
        clickedStarNum: 4,
        thumbRate: 5,
        reviewContent: "좋아요 또 살래요",
        productManagerReviewContent: "바로 구매 했습니다",
        date: "2024.06.04",
        productId: 2,
    },
    {
        files: profile,
        nickName: "nickname7",
        clickedStarNum: 4,
        thumbRate: 5,
        reviewContent: "좋아요",
        productManagerReviewContent: "바로 구매 했습니다",
        date: "2024.06.03",
        productId: 2,
    },
    {
      files: profile,
      nickName: "nickname8",
      clickedStarNum: 4,
      thumbRate: 5,
      reviewContent: "색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...색이 예쁘고 발이 편해요...",
      productManagerReviewContent: "바로 구매 했습니다",
      date: "2024.06.05",
      productId: 2,
  },
  {
      files: profile,
      nickName: "nickname9",
      clickedStarNum: 4,
      thumbRate: 5,
      reviewContent: "좋아요 또 살래요",
      productManagerReviewContent: "바로 구매 했습니다",
      date: "2024.06.04",
      productId: 2,
  },
  {
      files: profile,
      nickName: "nickname10",
      clickedStarNum: 4,
      thumbRate: 5,
      reviewContent: "좋아요",
      productManagerReviewContent: "바로 구매 했습니다",
      date: "2024.06.03",
      productId: 2,
  },
  {
      files: profile,
      nickName: "nickname11",
      clickedStarNum: 4,
      thumbRate: 5,
      reviewContent: "좋아요 또 살래요",
      productManagerReviewContent: "바로 구매 했습니다",
      date: "2024.06.04",
      productId: 2,
  },
  {
      files: profile,
      nickName: "nickname12",
      clickedStarNum: 4,
      thumbRate: 5,
      reviewContent: "좋아요",
      productManagerReviewContent: "바로 구매 했습니다",
      date: "2024.06.03",
      productId: 2,
  },
];

  // 데이터 추출
  const {
    image,
    description,
    userImage,
    userName,
    productTitle,
    productLikes,
    productStars,
    productStarsCount,
    productOptions,
    productManagersThumbCount,
    productManagerThumbCount,
    productId,

  } = data;

  // 옵션 선택 시
  const handleOptionSelect = (option) => {
    console.log(option);
  };

  const loadMore = useCallback(() => {
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;
    const newReviews = reviewData.slice(startIndex, endIndex);

    if (newReviews.length === 0) {
        setHasMore(false);
    } else {
      setListData((prev) => [...prev, ...newReviews]);
      setPage((prev) => prev + 1);
    }
  }, [page]);

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    if (!hasMore) return;
    
    console.log("useEffect");

    let currentLoader = loader.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
           loadMore(); 
        }
      },
      { threshold: 1 }
    );

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore, hasMore]);

  const ChatbuttonOnClick = () => {
    setChatVisible(!isChatVisible);
  }

  const closeChat = () => {
    setChatVisible(false);
  };


  const starRateRendering = (data) => {
    const result = [];
    for (let i = 0; i < data; i++) {
        result.push("⭐");
    }
    return result;
  }

  const starScore = index => {
    console.log(index + "clicked");
    let star = [...isClicked];
    for (let i = 0; i < 5; i++) {
        star[i] = i <= index ? true : false;
    }
    setClicked(star);
  };

  // 현재 선택한 별점 개수
  let clickedStarNum = isClicked.filter(element => true === element.lenght);

  // 상품 찜하기 버튼 클릭시 실행되는 함수
  const handleProductLike = productId => {
      setLiked(true);
  }



  return (
    <Wrapper>
      <Section>
        <MainImage src={image} alt="Main Image" />
        <Description>{description}</Description>
        

        <ReviewContainer>
               {isPurchased ? 
                <ReviewWriteContainer>
                  <ReviewIconWrapper>
                      <div>별점을 선택해주세요.</div>
                      <div>
                        {
                          array.map((el, index) => (
                            <FaRegStar key={index}
                                              onClick={() => starScore(index)}
                                              // src={isClicked[index] ? <MdOutlineStar /> :  <FaRegStar/>}
                                              className={isClicked[el] ?  <MdOutlineStar /> :  <FaRegStar/>}
                                              alt="starIcon"  />
                          ))
                        }
                      </div>
                  </ReviewIconWrapper>
                  <InputElement type="text" placeholder="구매후기를 작성해주세요"/>
                  <RegisterButton>후기 등록</RegisterButton>
                  </ReviewWriteContainer>
                  : <ReviewWriteContainer>상품 구매후에 후기를 작성할 수 있습니다</ReviewWriteContainer>}
          
             
            {listData.map((data, index) => (
            <ProfileContainer key={index}>
              <ReviewHeader>
                <img src={data.files} alt="profile"/>
                <div>{data.nickName}</div>
                <div>
                    {data.date}
                </div>
              </ReviewHeader>
             <StarContainer>
                <Icon>
                  {
                    starRateRendering(data.clickedStarNum)
                  }
                </Icon>
                {/* <Icon>
                👍 {productManagersThumbCount}({productManagerThumbCount})
                </Icon> */}
             </StarContainer>
                
                <div>{data.reviewContent}</div>
            {/* <div>{data.productManagerReviewContent}</div> */}
               
            </ProfileContainer>
            ))}
        </ReviewContainer>
        <div ref={loader}></div>
      </Section>
      <Section>
        <UserSection>
          <UserImage src={userImage} alt="User Image" />
          <UserName>{userName}</UserName>
          <img src={rightarrow}/>
        </UserSection>
        <ProductInfo>
          <ProductTitle>{productTitle}</ProductTitle>
          <IconsWrapper>
            <Icon>❤️ {productLikes}</Icon>
            <Icon>
              ⭐ {productStars}({productStarsCount})
            </Icon>
            <Icon>  <span>판매자에 대한 만족도</span>👍 {productManagersThumbCount}({productManagerThumbCount})</Icon>
          </IconsWrapper>
          <Buttons>
            {isLiked ? 
              <Icon>❤️</Icon>
              :
              <HeartIcon src={heartIcon} alt="Heart Icon" onClick={() => handleProductLike(data.productId)} />
            } 
            
            <Button onClick={ChatbuttonOnClick}>구매문의</Button>
        </Buttons>
        </ProductInfo>
      </Section>
      <ChatList visible={isChatVisible} onClose={closeChat} />
    </Wrapper>
  );
};

export default Detail;

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

const UserSection = styled.div`
  /* 사용자 정보 섹션 스타일링 */
  // border: 1px solid green;
  display: flex;
  align-items:center;
  
`;

const UserImage = styled.img`
  /* 사용자 이미지 스타일링 */
  width: 100%;
  max-width: 30px;
  height: auto;
  margin-right: 5px;
`;

const UserName = styled.span`
  /* 사용자 이름 스타일링 */
  margin-right: 5px;
`;

const ProductInfo = styled.div`
  /* 상품 정보 섹션 스타일링 */
`;

const ProductTitle = styled.h2`
  /* 상품 타이틀 스타일링 */
`;

const IconsWrapper = styled.div`
  /* 아이콘들을 감싸는 스타일 */
  margin-bottom: 260px;
`;

const Icon = styled.span`
  /* 아이콘 스타일 */
  margin-right: 5px;
  cursor: pointer;
`;
const HeartIcon = styled.img`
  /* 아이콘 스타일 */
  width: 30px;
  margin-right: 6px;
  cursor: pointer;
`;

const Buttons = styled.div`
  /* 버튼 스타일링 */
  /*position: absolute;*/
  display: flex;
  align-items: center;
  z-index: 2;
`;

const RegisterButton = styled.button`
  width: 700px;
  height: 54px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px 0;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  &:hover {
    background-color: #f5f5f5;
  }

`;

const Button = styled.button`
  /* 버튼 스타일링 */
  width: 500px;
  height: 54px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px 0;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ReviewContainer = styled.div`
  width: 700px;
  display: flex;
  // border: 1px solid red;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
`;

const ReviewWriteContainer = styled.div`
  width: 700px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  margin-top: 40px;
  padding: 0 20px;
  gap: 10px;
`;

const ReviewIconWrapper = styled.div`
  display: flex;
  gap:10px;


`;


const ProfileContainer = styled.div`
    width: 700px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 10px;
    padding: 0 20px;
    gap: 10px;
    background-color: #F4F4F4;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  height: 50px;
  margin-top: 20px;
  gap: 10px;


`;

const StarContainer = styled.div`
display: flex;
width: 200px;
height: 50px;

`;

const InputElement = styled.input`
  width: 700px;
  height: 200px;
  border-radius: 10px;


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


const Pagination = styled.div`
   margin-top: 1800px;
   margin-left: 560px;


`;

const PageButton = styled.button`
    width: 35px;
    height: 35px;
    background-color: black;
    color: white;
    cursor: pointer;

`;