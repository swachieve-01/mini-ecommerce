import styled from "@emotion/styled";

// 추후 연결 후 변수명 수정 (목록페이지 부분)

export const SortDropdownWrapper = styled.div`
  position: relative;
  width: 160px;
`;

export const SortDropdownSelected = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  background: #fff;
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
  border-radius: 0 0 6px 6px;
  overflow: hidden;
  z-index: 10;

  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SortDropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #8fa77e;
    color: #fff;
  }
`;

export const SortDropdownBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
`;
