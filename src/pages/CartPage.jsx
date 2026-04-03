import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import CartItem from "../components/product/CartItem";
import { Button } from "../components/ui/Button";

const CartPageContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 56px 80px 0 80px;
  display: flex;
  flex-direction: column;
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
  min-height: 800px;
  border: 1px solid ${({ theme }) => theme.colors.borderFocus};
  margin-top: 67px;
  background-color: ${({ theme }) => theme.colors.bgSoft};
  display: flex;
  flex-direction: column;
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
  background-color: #fff;
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
  flex: 1;
`;

const CartBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const CartFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 40px 58px;
  gap: 24px;
  background-color: #fff;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const TotalPriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 24px;
  font-weight: 700;

  span.label {
    font-size: 18px;
    font-weight: 400;
    color: #666;
  }
`;

export default function CartPage() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const toggleAllCheck = useCartStore((state) => state.toggleAllCheck);
  const removeSelected = useCartStore((state) => state.removeSelected);

  const isAllChecked = cart.length > 0 && cart.every((item) => item.checked);

  const totalPrice = cart
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            <StyledCheckbox
              type="checkbox"
              id="all-select"
              checked={isAllChecked}
              onChange={() => toggleAllCheck(isAllChecked)}
            />
            <StyleCheckText htmlFor="all-select">전체선택</StyleCheckText>
          </CheckBox>

          <DelBox>
            <Button
              width="120px"
              height="38px"
              variant="outline"
              textColor="black"
              onClick={removeSelected}
            >
              선택삭제
            </Button>
          </DelBox>
        </CartHeader>

        {cart.length > 0 ? (
          /* ✅ 상품이 있을 때: 리스트 + 푸터 섹션 */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              flex: 1,
            }}
          >
            <div style={{ flex: 1, backgroundColor: "#fff" }}>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} onRemove={removeFromCart} />
              ))}
            </div>

            {/* ✅ 하단 합계 영역 추가 */}
            <CartFooter>
              <TotalPriceBox>
                <span className="label">총 상품금액</span>
                <span className="price">{totalPrice.toLocaleString()}원</span>
              </TotalPriceBox>
              <Button
                width="280px"
                height="56px"
                fontSize="xl"
                radius="sm"
                onClick={() => navigate("/order")}
                disabled={totalPrice === 0}
              >
                주문하기
              </Button>
            </CartFooter>
          </div>
        ) : (
          /* ✅ 상품이 없을 때 */
          <CartViewComtainer>
            <CartBox>
              <CartMainTitle>장바구니가 비었습니다</CartMainTitle>
              <CartMainMemo>원하시는 상품을 장바구니에 담아보세요</CartMainMemo>
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
        )}
      </CartMainContainer>
    </CartPageContainer>
  );
}
