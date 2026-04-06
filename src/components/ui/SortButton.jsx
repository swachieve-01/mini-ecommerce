import styled from "@emotion/styled";

// 추후 연결 후 변수명 수정 (목록페이지 부분)

export const SortDropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100px;

  @media (max-width: 600px) {
    min-width: 100px;
  }
`;

// 정렬 (베스트/무로배송 등) 버튼
export const SortDropdownSelected = styled.div`
  height: 46px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  background: #fff;

  font-size: 13px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: 600px) {
    height: 40px;
    padding: 0 12px;

    border: 1px solid #dcdcdc;
    border-radius: 8px;
    background: #fff;

    font-size: 13px;
    color: #333;
  }

  &:hover {
    border-color: #8fa77e;
    background: #f8faf7;
  }

  &:active {
    transform: scale(0.97);
  }

  ${({ open }) =>
    open &&
    `
    border-color: #8FA77E;
    background: #f3f7f3;
  `}
`;

export const SortDropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  border: 1px solid #ddd;
  background: #fff;
  border-top: none;
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;

  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SortDropdownItem = styled.li`
  padding: 12px 16px;
  font-size: 14px;
  cursor: pointer;

  transition: all 0.15s ease;

  &:hover {
    background-color: #f3f7f3;
    color: #333;
  }

  ${({ active }) =>
    active &&
    `
    background-color: #8FA77E;
    color: #fff;#030303
    font-weight: 500;
  `}
`;

export const SortDropdownBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
`;
