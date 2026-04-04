import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import CartItem from "../components/product/CartItem";
import { Button } from "../components/ui/Button";
import { useEffect } from "react";

const CartPageContainer = styled.div`
  width: 100%;
  max-width: 1440px;

  margin: 0 auto;
  padding: 70px 80px 0 80px;
  display: flex;
  flex-direction: column;
`;

const CartPageHeaer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: start;
  gap: 8px;
  padding-left: 17px;
  color: #4f6a4e;
`;

const CartTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: 600;
  margin: 0;
  color: #4f6a4e;
  margin: 45px 0 20px;
`;

const CartP = styled.p`
  padding-left: 3px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  margin: 0;
`;

const CartD = styled.p`
  font-size: 13px;
  font-weight: 400;
  margin: 0;
  color: #8aa08a;
  padding-left: 5px;
`;

const CartMainContainer = styled.div`
  width: 100%;
  min-height: 800px;
  border: 1px solid ${({ theme }) => theme.colors.borderFocus};
  margin-top: 67px;
  background-color: #f7f9f7;
  display: flex;
  flex-direction: column;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  padding: 16px 58px 16px 51px;
  background-color: #fff;
  border-bottom: 1px solid #e6ede8;
  box-shadow: 0 4px 12px rgba(143, 167, 126, 0.08);

  position: relative;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0;
`;

const StyledCheckbox = styled.input`
  display: none;
  /* appearance: none;
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
  } */
`;

const StyleCheckText = styled.label`
  width: 120px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
  transition: all 0.2s ease;

  /* 🔥 기본 상태 (은은한 그린) */
  color: #4f6a4e;
  background: rgba(143, 167, 126, 0.08);
  border: 1px solid rgba(143, 167, 126, 0.25);

  backdrop-filter: blur(6px);

  /* 체크 아이콘 */
  &::before {
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1.5px solid #cfd8cf;
    background: #fff;
    transition: all 0.2s;
  }

  input:checked + & {
    background: #8fa77e;
    color: #fff;
    border-color: #8fa77e;
  }

  input:checked + &::before {
    background: #fff;
    border-color: #fff;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%238FA77E' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
  }

  /* hover */
  &:hover {
    background: rgba(143, 167, 126, 0.15);
    border-color: rgba(143, 167, 126, 0.4);
    transform: translateY(-1px);
  }

  /* active */
  &:active {
    transform: scale(0.96);
  }
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

  svg {
    width: 160px;
    height: 160px;
    margin-bottom: 25px;
  }
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

const DeleteButton = styled.button`
  width: 120px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 500;

  color: #d64545;
  background: #fff5f5;
  border: 1px solid #ffd6d6;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ffe3e3;
    border-color: #ffb3b3;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export default function CartPage() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const toggleAllCheck = useCartStore((state) => state.toggleAllCheck);
  const removeSelected = useCartStore((state) => state.removeSelected);

  const isAllChecked = cart.length > 0 && cart.every((item) => item.checked);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <DeleteButton onClick={removeSelected}> 선택삭제</DeleteButton>
          </DelBox>
        </CartHeader>

        {cart.length > 0 ? (
          /* 상품이 있을 때: 리스트 + 푸터 섹션 */
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

            {/* 하단 합계 영역 추가 */}
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
          /* 상품이 없을 때 */
          <CartViewComtainer>
            <CartBox>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="207"
                height="194"
                viewBox="0 0 207 194"
                fill="none"
              >
                <path
                  d="M56.0566 50.717H165.217C167.28 50.7173 169.079 52.1203 169.581 54.1213L196.948 163.141C200.673 177.978 189.453 192.363 174.155 192.363H48.3018C33.1031 192.363 21.9018 178.153 25.4512 163.374L51.6816 54.1663C52.1675 52.1434 53.9763 50.7171 56.0566 50.717Z"
                  fill="#E2E2E2"
                  stroke="#8FA77E"
                  stroke-width="3"
                />
                <path
                  d="M39.4707 50.717H148.631C150.694 50.7173 152.493 52.1203 152.995 54.1213L180.362 163.141C184.087 177.978 172.867 192.363 157.569 192.363H31.7158C16.5172 192.363 5.31588 178.153 8.86523 163.374L35.0957 54.1663C35.5816 52.1434 37.3903 50.7171 39.4707 50.717Z"
                  fill="white"
                  stroke="#8FA77E"
                  stroke-width="3"
                />
                <path
                  d="M64.7761 63.6399C66.0823 63.64 67.1383 64.6963 67.1384 65.9954C67.1384 67.2945 66.0823 68.3507 64.7761 68.3508C63.4698 68.3508 62.4138 67.2946 62.4138 65.9954C62.4139 64.6962 63.4699 63.6399 64.7761 63.6399Z"
                  fill="#D9D9D9"
                  stroke="#8FA77E"
                  stroke-width="2"
                />
                <path
                  d="M125.293 63.6399C126.6 63.64 127.656 64.6963 127.656 65.9954C127.656 67.2945 126.6 68.3507 125.293 68.3508C123.987 68.3508 122.931 67.2946 122.931 65.9954C122.931 64.6962 123.987 63.6399 125.293 63.6399Z"
                  fill="#D9D9D9"
                  stroke="#8FA77E"
                  stroke-width="2"
                />
                <path
                  d="M64.7756 66.2192C73.8159 84.7129 98.5756 110.604 125.293 66.2192"
                  stroke="#8FA77E"
                  stroke-width="5"
                  stroke-linecap="round"
                />
                <path
                  d="M109.713 17.2502C105.534 22.1151 98.9756 25.2868 96.2504 22.9546C93.5251 20.6224 95.6646 13.6693 99.8438 8.80438C104.023 3.93944 112.783 -1.79568 115.508 0.536565C118.234 2.86881 113.892 12.3852 109.713 17.2502Z"
                  fill="#8FA77E"
                />
                <path
                  d="M86.6418 12.6734C92.7653 14.5999 98.2624 19.3749 97.1832 22.7923C96.104 26.2096 88.8571 26.9751 82.7336 25.0486C76.6101 23.122 67.8864 17.3319 68.9656 13.9146C70.0448 10.4973 80.5183 10.7469 86.6418 12.6734Z"
                  fill="#8FA77E"
                />
                <path
                  d="M109.603 8.05383C106.184 12.18 100.71 16.4896 96.9684 23.2664M91.6724 49.6646C88.1122 43.1848 91.7166 32.7786 96.9684 23.2664M81.5862 18.121C85.4157 18.7921 93.8535 20.7608 96.9684 23.2664"
                  stroke="#809471"
                  stroke-width="5"
                  stroke-linecap="round"
                />
              </svg>
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
