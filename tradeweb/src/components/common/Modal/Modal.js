import React from 'react';
import { useEffect, useRef } from "react";
import styled from "styled-components";
import useClickOutside from '../../../hooks/useClickOutside';
import ModalContainer from './ModalContainer';

const Modal = ({onClose, title, content, navigateToPage, onConfirm}) => {
    const modalRef = useRef(null);

    const handleClose = () => {
      onClose?.();
    };
  
    const handleConfirm = async () => {
      if (onConfirm) {
        await onConfirm();
      }
      if (navigateToPage) {
        navigateToPage();
      }
      handleClose();
    };
  
    useEffect(() => {
      const $body = document.querySelector("body");
      const overflow = $body.style.overflow;
      $body.style.overflow = "hidden";
      return () => {
        $body.style.overflow = overflow;
      };
    }, []);
  
    useClickOutside(modalRef, handleClose);
   
   
   
   
    return (
        <ModalContainer>
            <Overlay>
                <ModalWrap>
                    <div>{title}</div>
                    <div>
                       {content.map((data) => (
                        <ProfileContainer>
                            <img src={data.files} alt="profile"/>
                            <div>{data.nickName}</div>
                            <div>{data.reviewContent}</div>
                            <div>
                                <ChangeImgButton>{data.date}</ChangeImgButton>
                            </div>
                        </ProfileContainer>
                       ))}
                    </div>
                    
                    <div>
                        <button onClick={handleConfirm}>확인</button>
                    </div>
                </ModalWrap>
            </Overlay>

        </ModalContainer>
    );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 600px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ProfileContainer = styled.div`
    width: 600px;
    height: 95px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 40px;
    margin-bottom: 30px;
    padding: 0 20px;
    gap: 10px;
    background-color: #F4F4F4;
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