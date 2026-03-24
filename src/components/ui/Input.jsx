import React from "react";
import styled from "@emotion/styled";
import { OverlappingButton, SearchButton } from "../button/CommonButtons";

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 48px;

`;

const StyledSearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 50px 0 25px;
  border: 1.5px solid ${({theme}) => theme.colors.primary};
  box-shadow: 0 1px 0 0.5px rgba(0, 0, 0, 0.5) inset;
  border-radius: ${({theme}) => theme.radius.pill};
  outline: none;
  font-size: ${({theme}) => theme.fontSize.md};

  &:focus {
    border-color: ${({theme}) => theme.colors.primary};
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: -50px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  cursor: pointer;
  color: ${({theme}) => theme.colors.primaryDark};
`;

export function SearchInput({ onChange, onClick }) {
  return (
    <div>
      <p style={{ marginBottom: "8px", fontWeight: "bold" }}>검색창</p>

      <SearchContainer>
        <StyledSearchInput
          placeholder="검색어를 입력하세요"
          onChange={onChange}
        />
        <SearchIcon onClick={onClick}>🔍</SearchIcon>
      </SearchContainer>
    </div>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing.xs};
  box-sizing: border-box;
`;
const IdInput = styled.input`
  width: 270px;

  padding: 16px 8px;
  border-radius: ${({theme}) => theme.radius.xxl};
  border: 1px solid ${({theme}) => theme.colors.border};
`;
const PwInput = styled.input`
  width: 270px;
  height: 17px;
  padding: 16px 8px;
  border-radius: ${({theme}) => theme.radius.xxl};
  border: 1px solid ${({theme}) => theme.colors.border};
`;
export function LoginInput({ onIdChange, onPwChange }) {
  return (
    <div>
      <p>로그인</p>
      <LoginContainer>
        <IdInput
          type="text"
          placeholder="아이디 또는 전화번호"
          onChange={onIdChange}
        ></IdInput>
        <PwInput
          type="password"
          placeholder="비밀번호 (8~12자, 영문+숫자+특수문자)"
          onChange={onPwChange}
        ></PwInput>
      </LoginContainer>
    </div>
  );
}

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
`;

const Singbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme })=> theme.spacing.sm};
  padding: 16px 8px;
`;

const SignUpBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  width: 100%;
`;

const SingInput = styled.input`
  width: 244px;
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: ${({theme}) => theme.radius.xxl};
  margin: 0;
  padding: 24px 10px;
  width: 100%;
`;

export function SignUpInput({ values = {}, onChange, onCheckId }) {
  return (
    <SignUpContainer>
      <p>회원가입</p>
      <Singbox>
        <SignUpBox>
          <SingInput
            type="email"
            placeholder="예) example@email.com"
            value={values.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
          />
          <OverlappingButton onClick={onCheckId} />
        </SignUpBox>
        <SingInput
          type="password"
          placeholder="비밀번호 (8~12자, 영문+숫자+특수문자)"
          value={values.pw || ""}
          onChange={(e) => onChange("pw", e.target.value)}
        />
        <SingInput
          type="password"
          placeholder="비밀번호 확인"
          value={values.pwConfirm || ""}
          onChange={(e) => onChange("pwConfirm", e.target.value)}
        />
        <SingInput
          placeholder="이름 입력"
          value={values.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </Singbox>
    </SignUpContainer>
  );
}

const CartContainer = styled.div`
  display: flex;
  max-width: 1440px;
`;
const StyledInput = styled.div`
  border: 1px solid black;
  width: 1013px;
  height: 62px;
`;

//주문 조회
export function CartInput({ value = "", onChange }) {
  return (
    <CartContainer>

      <StyledInput
        type="number"
        placeholder="수량"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <SearchButton />
    </CartContainer>
  );
}
