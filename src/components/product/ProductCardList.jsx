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
const ProductCardImageBox = styled.div`
	width: 100%;
	height: 246px;
	overflow: hidden;
	position: relative;
	border-radius: ${({ theme }) => theme.radius.md};
	margin-bottom: 4px;

	&:hover:not(:has(button:hover)) .imgOverlay {
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

		transition: transform 0.2s ease, stroke 0.2s ease;
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
	const [likedItems, setLikedItems] = useState({});

	const toggleLike = (id) => {
		setLikedItems((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	return (
		<ProductGrid itemWidth={itemWidth}>
			{data?.map((item) => (
				<ProductCard key={item.id} align={align} mb={mb}>
					<ProductCardImageBox>
						<ProductImage src={item.imageUrl || item.thumbnails?.[0]} alt={item.name} />
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
										console.log("버튼 클릭");
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

										<circle cx="9" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
										<circle cx="17" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.8" fill="none" />

										<path d="M15 3V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
										<path d="M13.5 4.5H16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
									</svg>
								</ProductCartButton>
							</OverlayContent>
						</ProductCardOverlay>
						<ProductWishButton
							onClick={(e) => {
								e.stopPropagation();
								toggleLike(item.id);
							}}
							className={likedItems[item.id] ? "active" : ""}
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

					<ImageBox>
						<ProductImage src={item.imageUrl || item.thumbnails?.[0]} alt={item.name} />
						<Overlay className="overlay">
							<OverlayContent>
								<CartButton type="button">장바구니</CartButton>
							</OverlayContent>
						</Overlay>
						<WishButton type="button">🤍</WishButton>
					</ImageBox>

					<ProductName>{item.name}</ProductName>

					<ProductCardRating>
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
		</ProductGrid>
	);
}
