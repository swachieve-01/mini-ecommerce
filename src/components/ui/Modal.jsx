import React from "react";
import styled from "@emotion/styled";

// 모달 뒤의 어두운 배경
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

//모달 흰색 박스
const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  width: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

//모달 상단 헤더
const ModalHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* border-bottom: 1px solid #e2e2e2; */

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.colors.black};
  }
`;

//우상단 x 닫기 버튼
const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.gray400};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

//모달 내용물\
const ModalContent = styled.div`
  padding: 20px;
`;

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>{title}</h3>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Overlay>
  );
}
