import React from "react";
import styled from "@emotion/styled";
import { Button } from "../button/CommonButtons"; // 통합 버튼 임포트

// 1. 모든 인풋의 공통 스타일 (이것만 고치면 전부 바뀜)
const BaseInput = styled.input`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "48px"};
  padding: ${({ padding }) => padding || "0 16px"};
  border: 1px solid ${({ theme, borderColor }) => theme.colors[borderColor] || theme.colors.border};
  border-radius: ${({ theme, radius }) => theme.radius[radius] || "0px"};
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize] || theme.fontSize.md};
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

// 레이아웃용 스타일
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

// ============================================================================

// 1. 검색창 (SearchInput)
// 검색창을 감싸는 컨테이너 (포지션 기준점)
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ width }) => width || "100%"};
  max-width: 500px; 
`;

// 돋보기 아이콘 스타일 (인풋창 내부 오른쪽 고정)
const SearchIconWrapper = styled.div`
  position: absolute;
  right: 20px; 
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  
  &:hover {
    opacity: 0.7;
  }
`;

// 1. 검색창 (SearchInput) - 아이콘이 안으로 들어간 버전
export function SearchInput({ onChange, onClick, width }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <p style={{ fontWeight: "bold" }}>검색창</p>
      <SearchWrapper width={width}>
        <BaseInput 
          placeholder="검색어를 입력하세요"
          radius="pill"
          borderColor="primary"
          padding="0 50px 0 25px" // 오른쪽 패딩을 50px 줘서 글자가 아이콘과 겹치지 않게 함
          onChange={onChange}
        />

        <SearchIconWrapper onClick={onClick}>
          🔍
        </SearchIconWrapper>
      </SearchWrapper>
    </div>
  );
}

// 2. 로그인창 (LoginInput)
export function LoginInput({ onIdChange, onPwChange }) {
  return (
    <InputWrapper>
      <p style={{ fontWeight: "bold" }}>로그인</p>
      <BaseInput width="270px" radius="xxl" placeholder="아이디" onChange={onIdChange} />
      <BaseInput width="270px" radius="xxl" type="password" placeholder="비밀번호" onChange={onPwChange} />
    </InputWrapper>
  );
}

// 3. 회원가입 (SignUpInput)
export function SignUpInput({ values = {}, onChange, onCheckId }) {
  return (
    <InputWrapper style={{ width: "420px" }}>
      <p style={{ fontWeight: "bold" }}>회원가입</p>
      <FlexRow>
        <BaseInput 
          radius="xxl" 
          placeholder="예) example@email.com" 
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)} 
        />
        <Button width="101px" height="48px" radius="xxl" marginLeft="7px" onClick={onCheckId}>
          중복검사
        </Button>
      </FlexRow>
      <BaseInput radius="xxl" type="password" placeholder="비밀번호" onChange={(e) => onChange("pw", e.target.value)} />
      <BaseInput radius="xxl" placeholder="이름 입력" onChange={(e) => onChange("name", e.target.value)} />
    </InputWrapper>
  );
}

// 4. 주문 조회 (CartInput)
export function CartInput({ value = "", onChange, onClick }) {
  return (
    <FlexRow style={{ maxWidth: "1440px" }}>
      <BaseInput 
        height="62px" 
        placeholder="조회할 주문 번호를 입력하세요" 
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <Button width="173px" height="62px" radius="md" marginLeft="14px" fontSize="xxxl" onClick={onClick}>
        조회
      </Button>
    </FlexRow>
  );
}