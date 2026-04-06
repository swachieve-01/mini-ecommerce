/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import theme from "../../styles/theme";
import { useCartStore } from "../../stores/useCartStore";

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 40px;

  background-color: #fff;
  border-bottom: 1px solid #edf2ee;

  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f7faf7;
  }

  ${theme.media.mobile} {
    padding: 16px;
    flex-wrap: wrap;
  }
`;

// 체크박스
const CheckBox = styled.input`
  appearance: none;

  width: 20px;
  height: 20px;
  margin-right: 24px;

  border-radius: 6px;
  border: 1.5px solid #cfd8cf;
  background: #fff;

  cursor: pointer;
  transition: all 0.2s ease;

  &:checked {
    background-color: #8fa77e;
    border-color: #8fa77e;

    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");

    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  &:hover {
    border-color: #8fa77e;
  }
`;

// 이미지
const ProductImg = styled.img`
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 12px;
  margin-right: 20px;
  border: 1px solid #f0f3ef;
`;

// 상품 정보
const ProductInfo = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2f3e2f;
  margin: 0;
`;

const ProductDesc = styled.p`
  font-size: 12px;
  color: #8aa08a;
  margin: 0;
`;

// 수량
const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e3e8e1;
  border-radius: 8px;
  margin: 0 32px;
  background: #fff;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  button {
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #6f8662;
    font-size: 16px;
  }

  input {
    width: 40px;
    text-align: center;
    border: none;
    font-size: 14px;
    font-weight: 600;
    outline: none;

    -webkit-appearance: none;
    -moz-appearance: textfield;
  }
`;

// 가격
const PriceGroup = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  min-width: 140px;
  justify-content: flex-end;
`;

const SalePrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #2f3e2f;
`;

// 삭제 버튼 (아이콘)
const DeleteBtn = styled.button`
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  border: none;
  background: transparent;

  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
    stroke: #bbb;
    transition: all 0.2s ease;
  }

  &:hover svg {
    stroke: #d64545;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export default function CartItem({ item, onRemove }) {
  const toggleItemCheck = useCartStore((state) => state.toggleItemCheck);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

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

  return (
    <ItemContainer>
      <CheckBox
        type="checkbox"
        checked={item.checked || false}
        onChange={() => toggleItemCheck(item.id)}
      />

      <ProductImg src={item.image || null} alt={item.name} />

      <ProductInfo>
        <div>
          <ProductName>{item.name}</ProductName>
          <ProductDesc>
            {" "}
            {getCategoryDesc((item.categoryId || item.category)?.toLowerCase())}
          </ProductDesc>
        </div>
      </ProductInfo>

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

      <DeleteBtn onClick={() => onRemove(item.id)}>
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </DeleteBtn>
    </ItemContainer>
  );
}
