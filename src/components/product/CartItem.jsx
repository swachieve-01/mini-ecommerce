/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import theme from "../../styles/theme";
import { useCartStore } from "../../stores/useCartStore";

const getCategoryDesc = (id) => {
  switch (id) {
    case "skin":
      return "피부를 촉촉하게 유지해주는 스킨케어";
    case "cleanser":
      return "노폐물을 부드럽게 제거하는 클렌징";
    case "makeup":
      return "자연스럽고 생기있는 메이크업";
    case "hairbody":
      return "바디와 모발을 건강하게 케어";
    case "perfume":
      return "은은하게 지속되는 향기";
    case "beautytool":
      return "뷰티 케어를 도와주는 도구";
    default:
      return "";
  }
};

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 40px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;
  margin-bottom: 2px;
  width: 100%;

  ${theme.media.mobile} {
    padding: 16px;
    flex-wrap: wrap;
  }
`;

// 체크박스
const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 30px;
  cursor: pointer;
  accent-color: ${theme.colors.primary};
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 40px;
  background: #fff;
  button {
    width: 28px;
    height: 28px;
    border: none;
    background: none;
    cursor: pointer;
  }
  span {
    width: 34px;
    text-align: center;
    font-size: 14px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }

  input {
    width: 40px;
    height: 28px;
    text-align: center;
    border: none;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    font-size: 14px;
    font-weight: 600;
    outline: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

// 상품 이미지
const ProductImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 24px;
`;

// 상품 정보 (이름, 설명)
const ProductInfo = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProductName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const ProductDesc = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0;
  line-height: 1.4;
`;

// 수량 표시 영역
const QuantityText = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin: 0 40px;
  min-width: 60px;
  text-align: center;
`;

// 가격 영역 (할인 전/후 포함)
const PriceGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 30px;
  min-width: 180px;
  justify-content: flex-end;
`;

const OriginalPrice = styled.span`
  font-size: 14px;
  color: #aaa;
  text-decoration: line-through;
`;

const DiscountPercent = styled.span`
  font-size: 14px;
  color: #ff4d4f;
  font-weight: bold;
`;

const SalePrice = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: #222;
`;

// 삭제 버튼/아이콘
const DeleteBtn = styled.button`
  background: #d9d9d9;
  border: none;
  padding: 10px 14px;
  color: #555;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  white-space: nowrap;

  &:hover {
    background: #ccc;
  }
`;

export default function CartItem({ item, onRemove }) {
  const toggleItemCheck = useCartStore((state) => state.toggleItemCheck);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <ItemContainer>
      <CheckBox
        type="checkbox"
        checked={item.checked || false}
        onChange={() => toggleItemCheck(item.id)}
      />

      <ProductImg src={item.image || null} alt={item.name} />

      <ProductInfo>
        <ProductName>{item.name}</ProductName>
        <ProductDesc>{getCategoryDesc(item.category)}</ProductDesc>
      </ProductInfo>

      {/* ✅ 수량 조절 버튼으로 변경 */}
      <QuantityControl>
        <button
          type="button"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>

        <input
          type="number"
          value={item.quantity}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") return;

            const nextQty = parseInt(value, 10);
            updateQuantity(
              item.id,
              isNaN(nextQty) || nextQty < 1 ? 1 : nextQty,
            );
          }}
          onBlur={(e) => {
            if (e.target.value === "") updateQuantity(item.id, 1);
          }}
          style={{
            width: "40px",
            textAlign: "center",
            border: "none",
            borderLeft: "1px solid #ddd",
            borderRight: "1px solid #ddd",
            fontSize: "14px",
            fontWeight: "600",
            outline: "none",
            appearance: "none",
            MozAppearance: "textfield",
          }}
        />
        <button
          type="button"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </QuantityControl>

      <PriceGroup>
        <SalePrice>{(item.price * item.quantity).toLocaleString()}원</SalePrice>
      </PriceGroup>

      <DeleteBtn onClick={() => onRemove(item.id)}>삭제</DeleteBtn>
    </ItemContainer>
  );
}
