import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const StyledHome = styled.button`
  width: 288px;
  height: 62px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};

  cursor: pointer;
`;

const Arrow = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({theme})=> theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.xxl};
`;

export function HomeButton({ onClick }) {
  return (
    <StyledHome onClick={onClick}>
      <Arrow>홈으로 돌아가기 {">"} </Arrow>
    </StyledHome>
  );
}

const StyledLogin = styled.button`
  width: 352px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};

  cursor: pointer;
`;

const Login = styled.span`
  font-size: ${({theme}) => theme.fontSize.xl};
  font-weight: ${({theme}) => theme.fontWeight.regular};
  color: ${({theme}) => theme.colors.white};
`;

export function LoginButton({ onClick }) {
  return (
    <StyledLogin onClick={onClick}>
      <Login>로그인</Login>
    </StyledLogin>
  );
}

const StyledSignUp = styled.button`
  width: 352px;
  height: 48px;
  border-radius: ${({theme}) => theme.radius.pill};
  border: none;
  background-color: ${({theme}) => theme.colors.primary};

  cursor: pointer;
`;
const SignUp = styled.span`
  font-size: ${({theme}) => theme.fontSize.xl};
  font-weight: ${({theme}) => theme.fontWeight.regular};
  color: ${({theme}) => theme.colors.white};
`;

export function SignUpButton({ onClick }) {
  return (
    <StyledSignUp onClick={onClick}>
      <SignUp>회원가입</SignUp>
    </StyledSignUp>
  );
}

const StyledCart = styled.button`
  width: 282px;
  height: 56px;
  font-size: ${({theme}) => theme.fontSize.lg};
  border: none;
  background-color: ${({theme}) => theme.colors.primary};
  cursor: pointer;
`;

const Cart = styled.span`
  font-size: ${({theme}) => theme.fontSize.lg};
  font-weight: ${({theme}) => theme.fontWeight.medium};
  color: ${({theme}) => theme.colors.white};
`;

export function CartButton({ onClick }) {
  return (
    <StyledCart onClick={onClick}>
      <Cart>장바구니 담기</Cart>
    </StyledCart>
  );
}

const StyledSearch = styled.button`
  width: 173px;
  height: 62px;
  border: none;
 margin-left :14px ;
  background-color: ${({theme}) => theme.colors.primary};
  border-radius: ${({theme}) => theme.radius.md};
  cursor: pointer;
`;

const Search = styled.span`
  font-size: ${({theme}) => theme.fontSize.xxxl};
  font-weight: ${({theme}) => theme.fontWeight.regular};
  color: ${({theme}) => theme.colors.white};
`;

export function SearchButton({ onClick }) {
  return (
    <StyledSearch onClick={onClick}>
      <Search>조회</Search>
    </StyledSearch>
  );
}

const StyledOverlapping = styled.button`
  width: 101px;
  height: 48px;
margin-left: 7px;
  border-radius: ${({theme}) => theme.radius.xxl};
  border: none;
  background-color:${({theme}) => theme.colors.primary};

  cursor: pointer;
`;
const Overlapping = styled.span`
  font-size: ${({theme}) => theme.fontSize.md};
  font-weight: ${({theme}) => theme.fontWeight.medium};
  color: ${({theme}) => theme.colors.white};
`;

export function OverlappingButton({ onClick }) {
  return (
    <StyledOverlapping onClick={onClick}>
      <Overlapping>중복검사</Overlapping>
    </StyledOverlapping>
  );
}
const StyledOder = styled.button`
  width: 100px;
  height: 32px;
  border: none;
  background-color:${({theme}) => theme.colors.primary};

  cursor: pointer;
`;
const Oder = styled.span`
  color: ${({theme}) => theme.colors.white};
`;

export function OderButton({ onClick }) {
  return (
    <StyledOder onClick={onClick}>
      <Oder>주문하기</Oder>
    </StyledOder>
  );
}

const StyledKakao = styled.button`
  width: 176px;
  height: 44px;

  border: none;
  background-color: ${({theme}) => theme.colors.primary};

  cursor: pointer;
`;
const Kakao = styled.span`
  font-size: ${({theme}) => theme.fontSize.lg};
  font-weight: ${({theme}) => theme.fontWeight.regular};
  color: ${({theme}) => theme.colors.white};
`;
export function KakaoButton({ onClick }) {
  return (
    <StyledKakao onClick={onClick}>
      <Kakao>카카오톡 문의</Kakao>
    </StyledKakao>
  );
}

const StyledInquiry = styled.button`
  width: 176px;
  height: 44px;
  border: none;
  background-color:${({theme}) => theme.colors.primary};


  cursor: pointer;
`;
const Inquiry = styled.span`
  font-size: ${({theme}) => theme.fontSize.lg};
  font-weight: ${({theme}) => theme.fontWeight.regular};
  color: ${({theme}) => theme.colors.white};
`;

export function InquiryButton({ onClick }) {
  return (
    <StyledInquiry onClick={onClick}>
      <Inquiry>1대1 문의</Inquiry>
    </StyledInquiry>
  );
}

const StyledReview = styled.button`
  width: 169px;
  height: 42px;

  border: none;
  background-color: ${({theme}) => theme.colors.white};


  cursor: pointer;
`;
const Review = styled.span`
  font-size: ${({theme}) => theme.fontSize.sm};
  font-weight:${({theme}) => theme.fontWeight.regular};
  color: ${({theme}) => theme.colors.black};
`;

export function ReviewButton({ onClick }) {
  return (
    <StyledReview onClick={onClick}>
      <Review>리뷰 작성하기</Review>
    </StyledReview>
  );
}

const StyledCheck = styled.button`
  width: 100px;
  height: 32px;

  border: none;
  background-color: ${({theme}) => theme.colors.primary};


  cursor: pointer;
`;
const Check = styled.span`
  color: ${({theme}) => theme.colors.white};
`;

export function CheckButton({ onClick }) {
  return (
    <StyledCheck onClick={onClick}>
      <Check>확인</Check>
    </StyledCheck>
  );
}

const StyledCancell = styled.button`
  width: 100px;
  height: 32px;

  border: none;
  background-color: ${({theme}) => theme.colors.gray200};

  cursor: pointer;
`;
const Cancell = styled.span`
  color: ${({theme}) => theme.colors.black};
`;

export function CancellButton({ onClick }) {
  return (
    <StyledCancell onClick={onClick}>
      <Cancell>취소</Cancell>
    </StyledCancell>
  );
}

const StyledViewProduct = styled.button`
  width: 280px;
  height: 48px;

  border: none;
  border-radius: ${({theme}) => theme.radius.sm};
  background-color: ${({theme}) => theme.colors.primary};
 
  cursor: pointer;
`;
const ViewProduct = styled.span`
  font-size: ${({theme}) => theme.fontSize.xl};
  font-weight: ${({theme}) => theme.fontWeight.regular};
  color: ${({theme}) => theme.colors.white};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${({theme}) => theme.spacing.sm};
`;

const ArrowIcon = styled.span`
  color: ${({theme}) => theme.colors.white};
`;

export function ViewProductButton() {
  const navigate = useNavigate();

  return (
    <StyledViewProduct onClick={() => navigate("/products")}>
      <ViewProduct>
        상품 보러가기<ArrowIcon>→</ArrowIcon>
      </ViewProduct>
    </StyledViewProduct>
  );
}

const StyledDeleit = styled.button`
  width: 120px;
  height: 38px;
  border: 1px solid ${({theme}) => theme.colors.borderFocus};
  background-color: ${({theme}) => theme.colors.white};
  cursor: pointer;
`;
const Deleit = styled.span`
  color: ${({theme}) => theme.colors.black};
  font-size: ${({theme}) => theme.fontSize.lg};
  font-weight: ${({theme}) => theme.fontWeight.regular};
`;

export function DeleitButton({ onClick }) {
  return (
    <StyledDeleit onClick={onClick}>
      <Deleit>선택삭제</Deleit>
    </StyledDeleit>
  );
}

const StyledAllCategories = styled.button`
  width: 120px;
  height: 60px;
  background-color: ${({theme}) => theme.colors.primary};
  border: none;
  cursor: pointer;
`;
const AllCategories = styled.span`
  font-size: ${({theme}) => theme.fontSize.xxxl};
  font-weight: ${({theme}) => theme.fontWeight.regular};
  color: ${({theme})=> theme.colors.white};
`;

export function AllCategoriesButton({ onClick }) {
  return (
    <StyledAllCategories onClick={onClick}>
      <AllCategories>전체</AllCategories>
    </StyledAllCategories>
  );
}
const StyledMakeUp = styled.button`
  width: 173px;
  height: 62px;
  background-color: ${({theme}) => theme.colors.white};
  border: none;
  cursor: pointer;
`;
const MakeUp = styled.span`
  font-size: ${({theme}) => theme.fontSize.xxxl};
  font-weight:${({theme}) => theme.fontWeight.regular};
`;

export function MakeUpButton({ onClick }) {
  return (
    <StyledMakeUp onClick={onClick}>
      <MakeUp>메이크업</MakeUp>
    </StyledMakeUp>
  );
}
const StyledCleanser = styled.button`
  width: 140px;
  height: 62px;
  background-color:${({theme}) => theme.colors.white};
  border: none;
  cursor: pointer;
`;
const Cleanser = styled.span`
  font-size: ${({theme}) => theme.fontSize.xxxl};
  font-weight: ${({theme}) => theme.fontWeight.regular};
`;

export function CleanserButton({ onClick }) {
  return (
    <StyledCleanser onClick={onClick}>
      <Cleanser>클렌저</Cleanser>
    </StyledCleanser>
  );
}
const StyledCare = styled.button`
  width: 120px;
  height: 60px;
  background-color:${({theme}) => theme.colors.white};
  border: none;
  cursor: pointer;
`;
const Care = styled.span`
  font-size: ${({theme}) => theme.fontSize.xxxl};
  font-weight:${({theme}) => theme.fontWeight.regular};
`;

export function CareButton({ onClick }) {
  return (
    <StyledCare onClick={onClick}>
      <Care>케어</Care>
    </StyledCare>
  );
}
const StyledPerfume = styled.button`
  width: 120px;
  height: 60px;
  background-color: ${({theme}) => theme.colors.white};
  border: none;
  cursor: pointer;
`;
const Perfume = styled.span`
  font-size:${({theme}) => theme.fontSize.xxxl};
  font-weight: ${({theme}) => theme.fontWeight.regular};
`;

export function PerfumeButton({ onClick }) {
  return (
    <StyledPerfume onClick={onClick}>
      <Perfume>향수</Perfume>
    </StyledPerfume>
  );
}
const StyledProps = styled.button`
  width: 120px;
  height: 60px;
  background-color: ${({theme}) => theme.colors.white};
  border: none;
  cursor: pointer;
`;
const Props = styled.span`
  font-size: ${({theme}) => theme.fontSize.xxxl};
  font-weight: ${({theme}) => theme.fontWeight.regular};
`;

export function PropsButton({ onClick }) {
  return (
    <StyledProps onClick={onClick}>
      <Props>소품</Props>
    </StyledProps>
  );
}

const StyledGo = styled.div`
  width: 332px;
  height: 61px;
  border-radius: ${({theme}) => theme.radius.xxl};
  background-color: ${({theme}) => theme.colors.white};
  cursor: pointer;
  text-align: center;
`;

const Go = styled.span`
  font-size: ${({theme}) => theme.fontSize.displaySm};
  font-weight: ${({theme})=> theme.fontWeight.medium};
`;

export function GoButton({ onClick }) {
  return (
    <StyledGo onClick={onClick}>
      <Go>바로가기 {">"}</Go>
    </StyledGo>
  );
}
