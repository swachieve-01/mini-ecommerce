import React, { useState } from "react";
import styled from "@emotion/styled";
import BadgeStyle from "../ui/BadgeStyle";
import { useWishStore } from "../../stores/WishlisStore";
import { useCartStore } from "../../stores/useCartStore";
import { useToast } from "../feedback/ProductToast";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

// 상품 정렬
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 330px);
  gap: 20px;
  justify-content: center;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 330px);
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 330px);
  }

  /* 모바일에서만 줄이기 */
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 여기만 % */
    gap: 12px;
    padding: 0 16px;
  }
`;

//  상품 카드
const ProductCard = styled.div`
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: ${({ align = "center" }) => align};
  margin-bottom: ${({ mb = "0px" }) => mb};

  &:hover img {
    transform: scale(${({ theme }) => theme.scale.hover});
  }
`;

// 이미지 영역
const ProductCardImageBox = styled.div`
  width: 100%;
  height: 246px;
  overflow: hidden;
  position: relative;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 4px;

  &:hover .imgOverlay {
    opacity: 1;
  }

  &:hover:not(:has(button:hover)) img {
    transform: scale(${({ theme }) => theme.scale.hover});
  }
`;

// 이미지
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${({ theme }) => theme.transition.fast};
`;

// 상품명
const ProductName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

// 리뷰
const ProductCardRating = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray700};

  span {
    /* 수정필요 */
    color: #f5a623;
  }
`;

// 가격 영역
const PriceBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

// 할인
const Discount = styled.span`
  color: #ff4d4f;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.md};
  margin-right: 2px;
`;

// 할인가
const FinalPrice = styled.span`
  /* 수정필요 */
  /* color: ${(props) => (props.isDiscount ? "#D32F2F" : "#000")}; */
  color: ${(props) => (props.isDiscount ? "#FF4D4F" : "#000")};
  /* color: ${(props) => (props.isDiscount ? "#E60023" : "#000")}; */
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.md};
`;

// 원가 (취소선)
const OriginalPrice = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray500};
  text-decoration: line-through;
`;

// 뱃지영역
const ProductBadgeBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 4px;
`;

// 장바구니 영역
const ProductCardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: 0.3s;
  pointer-events: none;
`;

// 장바구니 버튼영역
const OverlayContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: auto;
`;

const ProductCartButton = styled.button`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: none;

  color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all 0.3s ease;
`;

// 찜하기
const ProductWishButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 22px;
  height: 22px;

  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50px;

  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;

    stroke: rgba(60, 60, 60, 0.5);
    stroke-width: 1;
    fill: none;

    transition:
      transform 0.2s ease,
      stroke 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.2);
  }

  &.active {
    background: none;
  }

  &.active svg {
    stroke: none;
    fill: #eb3939c0;
  }

  &.active svg path {
    stroke: none;
  }
`;

export default function ProductCardList({ data, itemWidth, align, mb }) {
  const { wishList, toggleWish } = useWishStore();
  const addCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const isInCart = (id) => cart.some((item) => item.id === id);
  const isWished = (id) => wishList.some((item) => item.id === id);
  const { trigger, ToastUI } = useToast();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <ProductGrid itemWidth={itemWidth}>
      {data?.map((item) => (
        <ProductCard
          key={item.id}
          align={align}
          mb={mb}
          onClick={() => navigate(`/products/${item.id}`)}
          style={{ cursor: "pointer" }}
        >
          <ProductCardImageBox>
            <ProductImage
              src={item.imageUrl || item.thumbnails?.[0]}
              alt={item.name}
            />
            <ProductCardOverlay
              className="imgOverlay"
              onClick={() => {
                console.log("장바구니 클릭");
              }}
            >
              <OverlayContent>
                <ProductCartButton
                  onClick={(e) => {
                    e.stopPropagation();

                    if (isInCart(item.id)) {
                      trigger("이미 장바구니에 있습니다");
                      return;
                    }

                    addCart({
                      id: item.id,
                      name: item.name,
                      price: item.discountPrice || item.price,
                      image: item.imageUrl || item.thumbnails?.[0],
                      category: item.categoryId,
                      quantity: 1,
                      checked: true,
                    });

                    if (isAuthenticated) {
                      trigger(`${item.name} 장바구니에 저장되었습니다.`);
                    } else {
                      trigger("장바구니에 담겼습니다. 로그인하면 저장됩니다.");
                    }
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 6H6L7.5 14H17.5L19 9H7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle
                      cx="9"
                      cy="18"
                      r="1.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      fill="none"
                    />
                    <circle
                      cx="17"
                      cy="18"
                      r="1.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      fill="none"
                    />

                    <path
                      d="M15 3V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13.5 4.5H16.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </ProductCartButton>
              </OverlayContent>
            </ProductCardOverlay>
            <ProductWishButton
              onClick={(e) => {
                e.stopPropagation();
                toggleWish(item);
              }}
              className={isWished(item.id) ? "active" : ""}
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21s-6.5-4.35-9-8.5C1.5 8.5 3.5 5 7 5c2 0 3.5 1 5 2.5C13.5 6 15 5 17 5c3.5 0 5.5 3.5 4 7.5-2.5 4.15-9 8.5-9 8.5z"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ProductWishButton>
          </ProductCardImageBox>

          <ProductName>{item.name}</ProductName>

          <PriceBox>
            {item.discount > 0 ? (
              <>
                <Discount>{Math.round(item.discount * 100)}%</Discount>
                <FinalPrice isDiscount>
                  {item.discountPrice.toLocaleString()}원
                </FinalPrice>
                <OriginalPrice>{item.price.toLocaleString()}원</OriginalPrice>
              </>
            ) : (
              <FinalPrice>{item.price.toLocaleString()}원</FinalPrice>
            )}
          </PriceBox>

          <ProductCardRating
            onClick={(e) => {
              e.stopPropagation();
              navigate("/reviews");
            }}
            style={{ cursor: "pointer" }}
          >
            <span>
              {"★".repeat(Math.round(item.rating))}
              {"☆".repeat(5 - Math.round(item.rating))}
            </span>{" "}
            {item.rating} ({item.reviewCount})
          </ProductCardRating>

          <ProductBadgeBox>
            {item.badge?.map((b, i) => (
              <BadgeStyle key={i} text={b} />
            ))}
          </ProductBadgeBox>
        </ProductCard>
      ))}
      <ToastUI />
    </ProductGrid>
  );
}
