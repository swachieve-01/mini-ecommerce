import React from "react";
import styled from "@emotion/styled";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";

import { Button } from "../components/ui/Button";

const CartPageContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 56px 80px 0 80px;
`;

const CartPageHeaer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-left: 17px;
`;

const CartTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.displayXl};
  font-weight: 400;
  margin: 0;
`;

const CartP = styled.p`
  font-size: ${({ theme }) => theme.fontSize.displaySm};
  font-weight: 400;
  margin: 0;
`;

const CartD = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 400;
  margin: 0;
  color: ${({ theme }) => theme.colors.gray500};
`;

const CartMainContainer = styled.div`
  width: 100%;
  height: 1400px;
  border: 1px solid ${({ theme }) => theme.colors.borderFocus};
  margin-top: 64px;
  background-color: ${({ theme }) => theme.colors.bgSoft};
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 152px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: 16px 58px 16px 51px;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0;
`;

const StyledCheckbox = styled.input`
  appearance: none;
  width: 100%;
  max-width: 24px;
  height: 24px;
  border: 1px solid ${({ theme }) => theme.colors.borderFocus};
  border-radius: ${({ theme }) => theme.radius.sm};
  outline: none;
  cursor: pointer;
  transition: all 0.2s;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const StyleCheckText = styled.label`
  display: inline-block;
  width: 90px;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const DelBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
`;

const CartViewComtainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CartBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartMainTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.displaySm};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  margin: 0;
`;

const CartMainMemo = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-align: center;
  margin: 0;
  margin-top: 18px;
`;

export default function CartPage() {
  const navigate = useNavigate(); // 버튼 이동을 위해 필요
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <CartPageContainer>
      <CartPageHeaer>
        <CartTitle>장바구니</CartTitle>
        <CartP>장바구니에 담긴 상품을 확인하세요</CartP>
        <CartD>※ 상품은 30일 후 자동 삭제됩니다.</CartD>
      </CartPageHeaer>

      <CartMainContainer>
        <CartHeader>
          <CheckBox>
            <StyledCheckbox type="checkbox" id="all-select" />
            <StyleCheckText htmlFor="all-select">전체선택</StyleCheckText>
          </CheckBox>

          <DelBox>
            <Button
              width="120px"
              height="38px"
              variant="outline"
              textColor="black"
              fontSize="lg"
            >
              선택삭제
            </Button>
          </DelBox>
        </CartHeader>

        <CartViewComtainer>
          <CartBox>
            <CartMainTitle>장바구니가 비었습니다</CartMainTitle>
            <CartMainMemo>원하시는 상품을 장바구니에 담아보세요</CartMainMemo>

            {/* 3. 기존 ViewProductButton 대신 공통 Button 사용 */}
            <Button
              width="280px"
              height="48px"
              radius="sm"
              fontSize="xl"
              style={{ marginTop: "20px" }}
              onClick={() => navigate("/products")}
            >
              상품 보러가기 →
            </Button>
          </CartBox>
        </CartViewComtainer>
      </CartMainContainer>
    </CartPageContainer>
  );
}
