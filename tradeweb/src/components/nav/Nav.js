import React, { useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

//svg
import search from "../../assets/search.svg";

const Nav = () => {
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const handleSearchButton = () => {
    setIsSearchClicked(!isSearchClicked);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Super24</Title>
        <ButtonWrapper>
          <HomeButton>HOME</HomeButton>
          <SearchButton>
            <SearchImg src={search} onClick={handleSearchButton} />
            <CSSTransition
              in={isSearchClicked}
              timeout={420}
              classNames="input"
              unmountOnExit
            >
              <SearchInputAnimation>
                <SearchInput />
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

const Title = styled.h2``;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HomeButton = styled.div`
  font-size: 25px;
  margin-right: 15px;
  cursor: pointer;
`;

const SearchButton = styled.div`
  display: flex;
  align-items: center;
`;

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
