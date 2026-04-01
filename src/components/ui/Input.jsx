import React from "react";
import styled from "@emotion/styled";
import { Button } from "./Button";

// 1. 모든 인풋의 공통 스타일
const BaseInput = styled.input`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "48px"};
  padding: ${({ padding }) => padding || "0 16px"};
  border: 1px solid
    ${({ theme, borderColor }) =>
      theme.colors[borderColor] || theme.colors.border};
  border-radius: ${({ theme, radius }) => theme.radius[radius] || "0px"};
  font-size: ${({ theme, fontSize }) =>
    theme.fontSize[fontSize] || theme.fontSize.md};
  outline: none;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
    font-size: ${({ theme }) => theme.fontSize.sm};
    opacity: 1;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
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
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ width }) => width || "100%"};
  max-width: 500px;
`;

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

export function SearchInput({ onChange, onClick, width }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <p style={{ fontWeight: "bold" }}>검색창</p>
      <SearchWrapper width={width}>
        <BaseInput
          placeholder="검색어를 입력하세요"
          radius="pill"
          borderColor="primary"
          padding="0 50px 0 25px"
          onChange={onChange}
        />

        <SearchIconWrapper onClick={onClick}>🔍</SearchIconWrapper>
      </SearchWrapper>
    </div>
  );
}

// 2. 로그인창 (LoginInput)
export function LoginInput({
  idValue = "",
  pwValue = "",
  onIdChange,
  onPwChange,
  width = "270px",
}) {
  return (
    <InputWrapper>
      <p style={{ fontWeight: "bold" }}>로그인</p>
      <BaseInput
        width={width}
        radius="xxl"
        placeholder="예) example@email.com"
        value={idValue}
        onChange={onIdChange}
      />
      <BaseInput
        width={width}
        radius="xxl"
        type="password"
        placeholder="비밀번호 (8~12자, 영문+숫자+특수문자)"
        value={pwValue}
        onChange={onPwChange}
      />
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
        <Button
          width="101px"
          height="48px"
          radius="xxl"
          marginLeft="7px"
          onClick={onCheckId}
        >
          중복검사
        </Button>
      </FlexRow>
      <BaseInput
        radius="xxl"
        type="password"
        placeholder="비밀번호 (8~12자, 영문+숫자+특수문자)"
        onChange={(e) => onChange("pw", e.target.value)}
      />
      <BaseInput
        radius="xxl"
        placeholder="이름 입력"
        onChange={(e) => onChange("name", e.target.value)}
      />
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
      <Button
        width="173px"
        height="62px"
        radius="md"
        marginLeft="14px"
        fontSize="xxxl"
        onClick={onClick}
      >
        조회
      </Button>
    </FlexRow>
  );
}
