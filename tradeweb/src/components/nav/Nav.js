import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//svg
import search from "../../assets/search.svg";

const Nav = () => {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  //검색창 열기
  const handleSearchButton = () => {
    setIsSearchClicked(!isSearchClicked);
  };

  const getValue = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/search?keyword=${keyword}`);
  };

  const onSubmitSearch = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  //로그아웃
  const handleLogout = async () => {
    const email = localStorage.getItem("email");
    if (email) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}users/logout`,
          {
            email,
          }
        );
        localStorage.removeItem("accessToken");
        localStorage.removeItem("email");
        localStorage.removeItem("userId");
        localStorage.removeItem("buyer_id");
        navigate("/");
        window.location.reload();
      } catch (error) {
        if (error.response) {
          console.error("로그아웃 실패:", error.response.data);
        } else if (error.request) {
          console.error("요청이 만들어졌으나 응답을 받지 못함:", error.request);
        } else {
          console.error("로그아웃 요청 설정 오류:", error.message);
        }
      }
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Container>
      <Wrapper>
        <Title onClick={() => navigate("/")}>Super24</Title>
        <ButtonWrapper>
          {isLoggedIn ? (
            <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>
          ) : (
            <AuthButton onClick={handleLogin}>LOGIN</AuthButton>
          )}
          <SearchButton>
            <SearchImg src={search} onClick={handleSearchButton} />
            <CSSTransition
              in={isSearchClicked}
              timeout={420}
              classNames="input"
              unmountOnExit
            >
              <SearchInputAnimation>
                <SearchInput
                  type="search"
                  value={keyword}
                  onChange={getValue}
                  onKeyPress={onSubmitSearch}
                />
              </SearchInputAnimation>
            </CSSTransition>
          </SearchButton>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
};

export default Nav;

const Container = styled.div`
  width: 100%;
  height: 80px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: #ffffff;
  top: 0;
  left: 0;
  z-index: 999;
`;

const Wrapper = styled.div`
  width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  cursor: pointer;
  font-size: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchButton = styled.div`
  padding-top: 4px;
  display: flex;
  align-items: center;
`;

const AuthButton = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  font-size: 25px;
  cursor: pointer;
`;

const LogoutButton = styled(AuthButton)``;

const SearchImg = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  font-size: 15px;
  outline: none;
  height: 25px;
  width: 100%;
  border: none;
  border-bottom: 2px solid black;
`;

const SearchInputAnimation = styled.div`
  &.input-enter {
    width: 0;
  }

  &.input-enter-active {
    width: 200px;
    transition: width 500ms;
  }

  &.input-exit {
    width: 200px;
  }

  &.input-exit-active {
    width: 0;
    transition: width 500ms;
  }
`;
