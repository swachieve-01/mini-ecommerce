import React, { useState } from "react";
import styled from "@emotion/styled";
import BadgeStyle from "../ui/BadgeStyle";
import { Link } from "react-router-dom";

// 상품 정렬
const ProductGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, ${({ itemWidth = "330px" }) => itemWidth});
	gap: 20px;

	justify-content: center;
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
const ImageBox = styled.div`
	width: 100%;
	height: 246px;
	overflow: hidden;
	position: relative;
	border-radius: ${({ theme }) => theme.radius.md};
	&:hover .overlay {
		opacity: 1;
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
const Rating = styled.p`
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
const BadgeBox = styled.div`
	display: flex;
	justify-content: center;
	gap: 4px;
	flex-wrap: wrap;
	margin-top: 4px;
`;

// 장바구니 영역
const Overlay = styled.div`
	position: absolute;
	inset: 0;
	background: rgba(0, 0, 0, 0.4);
	opacity: 0;
	transition: 0.3s;
`;

// 장바구니 버튼영역
const OverlayContent = styled.div`
	position: absolute;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
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
const WishButton = styled.button`
	position: absolute;
	top: 8px;
	right: 8px;
	width: 32px;
	height: 32px;
	background: rgba(255, 255, 255, 0.9);
	border-radius: ${({ theme }) => theme.radius.pill};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;

	&:hover {
		transform: scale(1.1);
	}
`;

export default function ProductCardList({ data, itemWidth, align, mb }) {
	return (
		<ProductGrid itemWidth={itemWidth}>
			{data?.map((item) => (
				<ProductCard key={item.id} align={align} mb={mb}>
					<ImageBox>
						<ProductImage src={item.imageUrl || item.thumbnails?.[0]} alt={item.name} />
						<Overlay className="overlay">
							<OverlayContent>
								<CartButton>장바구니</CartButton>
							</OverlayContent>
						</Overlay>
						<WishButton>🤍</WishButton>
					</ImageBox>

					<ProductName>{item.name}</ProductName>

					<PriceBox>
						{item.discount > 0 ? (
							<>
								<Discount>{Math.round(item.discount * 100)}%</Discount>
								<FinalPrice isDiscount>{item.discountPrice.toLocaleString()}원</FinalPrice>
								<OriginalPrice>{item.price.toLocaleString()}원</OriginalPrice>
							</>
						) : (
							<FinalPrice>{item.price.toLocaleString()}원</FinalPrice>
						)}
					</PriceBox>

					<Rating>
						<span>
							{"★".repeat(Math.round(item.rating))}
							{"☆".repeat(5 - Math.round(item.rating))}
						</span>{" "}
						{item.rating} ({item.reviewCount})
					</Rating>

					<BadgeBox>
						{item.badge?.map((b, i) => (
							<BadgeStyle key={i} text={b} />
						))}
					</BadgeBox>
				</ProductCard>
			))}
		</ProductGrid>
	);
}
