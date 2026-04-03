import React from "react";
import styled from "@emotion/styled";

// 모달 뒤의 어두운 배경
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
`;

// 모달 전체 박스
const ModalContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg};
  width: ${({ imageMode }) => (imageMode ? "auto" : "440px")};
  max-width: ${({ imageMode }) => (imageMode ? "min(90vw, 980px)" : "90vw")};
  max-height: ${({ imageMode }) => (imageMode ? "90vh" : "80vh")};
  /* border-radius: ${({ imageMode }) => (imageMode ? "0" : "10px")}; */
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
`;

// 모달 상단 헤더
const ModalHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: 15px 20px;
  display: ${({ imageMode }) => (imageMode ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  position: relative;
  flex-shrink: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.colors.black};
  }
`;

// 닫기 버튼
const CloseButton = styled.button`
  position: absolute;
  top: ${({ imageMode }) => (imageMode ? "12px" : "10px")};
  right: ${({ imageMode }) => (imageMode ? "12px" : "10px")};

  width: ${({ imageMode }) => (imageMode ? "36px" : "30px")};
  height: ${({ imageMode }) => (imageMode ? "36px" : "30px")};

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${({ imageMode }) =>
    imageMode ? "rgba(0, 0, 0, 0.18)" : "rgba(0, 0, 0, 0.12)"};

  color: rgba(255, 255, 255, 0.95);
  font-size: ${({ imageMode }) => (imageMode ? "24px" : "20px")};
  line-height: 1;
  font-family: Arial, sans-serif;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);

  cursor: pointer;
  z-index: 3;

  &:hover {
    background: ${({ imageMode }) =>
      imageMode ? "rgba(0, 0, 0, 0.28)" : "rgba(0, 0, 0, 0.2)"};
  }
`;

// 모달 내용물
const ModalContent = styled.div`
  padding: ${({ imageMode }) => (imageMode ? "0" : "20px")};
  box-sizing: border-box;
  flex: 1;
  min-height: 0;

  overflow-y: ${({ imageMode }) => (imageMode ? "visible" : "auto")};
  overflow-x: hidden;

  white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

// 모달 하단 버튼 영역
const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 20px 20px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.bg};
`;

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  imageMode = false,
  actions = null,
}) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer
        imageMode={imageMode}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader imageMode={imageMode}>
          <h3>{title}</h3>
          {!imageMode && (
            <CloseButton type="button" imageMode={imageMode} onClick={onClose}>
              ×
            </CloseButton>
          )}
        </ModalHeader>

        {imageMode && (
          <CloseButton type="button" imageMode={imageMode} onClick={onClose}>
            ×
          </CloseButton>
        )}

        <ModalContent imageMode={imageMode}>{children}</ModalContent>

        {!imageMode && actions && <ModalFooter>{actions}</ModalFooter>}
      </ModalContainer>
    </Overlay>
  );
}
