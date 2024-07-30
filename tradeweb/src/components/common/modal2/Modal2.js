import React, { useState, useRef } from 'react';
import styled from "styled-components";

const Modal2 = ({onOk, onCancel, onClose, children}) => {
  return (
    <ModalContainer>
        <ModalWrapper>
            <ModalHeader>
                <CloseBtn onClick={() => onClose("예, 모달창이 닫혔습니다")}>&times;</CloseBtn>
            </ModalHeader>
            <ModalContent>
                <h1>{children}</h1>
            </ModalContent>
            <ModalFooter>
                <BtnSubmit onClick={() => onOk("예, 모달창이 닫혔습니다")}>예</BtnSubmit>
                <BtnCancel onClick={() => onCancel("모달창이 닫혔습니다")}>아니오</BtnCancel>
            </ModalFooter>
        </ModalWrapper>
    </ModalContainer>
  )
}

export default Modal2

const ModalContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
`;

const ModalWrapper = styled.div`
    width: 30em;
    padding: 2rem;
    border-radius: 5px;
    background-color: white;
    font-size: 18px;
    order: none;
    outline: none;
    transition: .5s;
    box-shadow: 0 .1rem 1rem rgba(0,  0,  0, .8);
`;

const ModalHeader  = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 2rem;
`;

const CloseBtn = styled.div`
    cursor: pointer;
`;

const ModalContent = styled.div`
    margin-bottom: 2rem;
}
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-evenly;  
`;

const BtnSubmit = styled.button`
    background-color: #43a942;
`;

const BtnCancel = styled.button`
    background-color: #d9534f;

`;