/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
	console.log("상세페이지 렌더됨");
	const { id } = useParams();
	console.log("id:", id);

	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedImage, setSelectedImage] = useState("");
	const [selectedOption, setSelectedOption] = useState("");

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true);
				setError("");

				const res = await fetch(`http://localhost:3000/products/${id}`);

				if (!res.ok) {
					throw new Error("상품 정보를 불러오지 못했습니다.");
				}

				const data = await res.json();
				setProduct(data);
				setSelectedImage(data.thumbnails?.[0] || data.imageUrl || "");
				setSelectedOption(data.options?.[0] || "");
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	if (loading) return <div css={messageStyle}>로딩 중...</div>;
	if (error) return <div css={messageStyle}>{error}</div>;
	if (!product) return <div css={messageStyle}>상품 정보가 없습니다.</div>;

	const thumbImages = product.thumbnails?.length ? product.thumbnails : [product.imageUrl];

	return (
		<div css={pageWrap}>
			<div css={inner}>
				<section css={topSection}>
					<div css={leftArea}>
						<div css={mainImageBox}>
							<img src={selectedImage} alt={product.name} css={mainImage} />
						</div>

						<div css={thumbRow}>
							{thumbImages.map((img, index) => (
								<button
									key={index}
									type="button"
									css={thumbButton(selectedImage === img)}
									onClick={() => setSelectedImage(img)}
								>
									<img src={img} alt={`${product.name} 썸네일 ${index + 1}`} css={thumbImage} />
								</button>
							))}
						</div>
					</div>

					<div css={rightArea}>
						<h1 css={title}>{product.name}</h1>

						<div css={ratingRow}>
							<span css={starText}>★★★★★</span>
							<span css={reviewText}>{product.rating}</span>
						</div>

						<div css={priceArea}>
							<div css={priceRow}>
								<span css={salePrice}>{product.discountPrice.toLocaleString()}원</span>
								<span css={originPrice}>{product.price.toLocaleString()}원</span>
								<span css={discountBadge}>{Math.round(product.discount * 100)}%</span>
							</div>
						</div>

						<div css={infoList}>
							<div css={infoRow}>
								<span css={dot} />
								<p css={infoText}>
									{product.deliveryInfo || (
										<>
											배송정보, 무료배송 <strong>(당일 배송 가능)</strong>
										</>
									)}
								</p>
							</div>

							<div css={infoRow}>
								<span css={dot} />
								<p css={infoText}>
									{product.pointInfo || (
										<>
											적립금, 혜택 <strong>(0.4%)</strong>
										</>
									)}
								</p>
							</div>
						</div>

						<div css={benefitBox}>
							<div css={benefitTitle}>배송안내</div>
							<ul css={benefitList}>
								{product.benefits?.length ? (
									product.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)
								) : (
									<>
										<li>오후 3시 이전, 당일 배송</li>
										<li>평균 배송기간 1~2일 소요</li>
										<li>해당 서비스 가능 지역에 한함, 외 별도 추가비용</li>
									</>
								)}
							</ul>
						</div>

						<div css={optionBox}>
							<div css={optionLabel}>옵션 선택</div>
							<select css={selectBox} value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
								{product.options?.length ? (
									product.options.map((option, index) => (
										<option key={index} value={option}>
											{option}
										</option>
									))
								) : (
									<option value="기본 옵션">기본 옵션</option>
								)}
							</select>
						</div>

						<button css={cartButton}>장바구니 담기</button>
					</div>
				</section>

				<section css={detailSection}>
					{product.detailImage ? (
						<img src={product.detailImage} alt={`${product.name} 상세 이미지`} css={detailImage} />
					) : null}
				</section>
			</div>
		</div>
	);
}

const pageWrap = css`
	background: #f5f5f5;
	min-height: 100vh;
	padding: 32px 0 80px;
`;

const inner = css`
	max-width: 1100px;
	margin: 0 auto;
`;

const topSection = css`
	display: flex;
	gap: 48px;
	background: #fff;
	border: 1px solid #e3e3e3;
	padding: 44px;
	margin-bottom: 48px;
`;

const leftArea = css`
	flex: 1;
`;

const mainImageBox = css`
	width: 100%;
	max-width: 520px;
	aspect-ratio: 1 / 1;
	background: #f1f1f1;
	overflow: hidden;
	margin-bottom: 20px;
`;

const mainImage = css`
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
`;

const thumbRow = css`
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
`;

const thumbButton = (active) => css`
	width: 62px;
	height: 62px;
	border: 1px solid ${active ? "#8da26f" : "#ddd"};
	background: #fff;
	padding: 0;
	cursor: pointer;
	overflow: hidden;
`;

const thumbImage = css`
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
`;

const rightArea = css`
	width: 360px;
	flex-shrink: 0;
`;

const title = css`
	font-size: 28px;
	font-weight: 700;
	line-height: 1.3;
	color: #111;
	margin: 0 0 14px;
`;

const ratingRow = css`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 20px;
`;

const starText = css`
	font-size: 14px;
	color: #f5a623;
	letter-spacing: 1px;
`;

const reviewText = css`
	font-size: 14px;
	color: #666;
`;

const priceArea = css`
	padding-bottom: 20px;
	border-bottom: 1px solid #e5e5e5;
	margin-bottom: 20px;
`;

const priceRow = css`
	display: flex;
	align-items: center;
	gap: 10px;
	flex-wrap: wrap;
`;

const salePrice = css`
	font-size: 34px;
	font-weight: 700;
	color: #e60012;
`;

const originPrice = css`
	font-size: 14px;
	color: #999;
	text-decoration: line-through;
`;

const discountBadge = css`
	padding: 4px 10px;
	border-radius: 999px;
	background: #8da26f;
	color: #fff;
	font-size: 12px;
	font-weight: 600;
`;

const infoList = css`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding-bottom: 20px;
	border-bottom: 1px solid #e5e5e5;
	margin-bottom: 20px;
`;

const infoRow = css`
	display: flex;
	align-items: flex-start;
	gap: 10px;
`;

const dot = css`
	width: 10px;
	height: 10px;
	background: #333;
	border-radius: 50%;
	margin-top: 6px;
	flex-shrink: 0;
`;

const infoText = css`
	font-size: 14px;
	color: #222;
	margin: 0;
	line-height: 1.5;
`;

const benefitBox = css`
	border: 1px solid #dcdcdc;
	margin-bottom: 18px;
`;

const benefitTitle = css`
	padding: 10px 14px;
	font-size: 13px;
	font-weight: 700;
	border-bottom: 1px solid #e5e5e5;
	background: #fafafa;
`;

const benefitList = css`
	margin: 0;
	padding: 12px 18px 12px 28px;
	font-size: 13px;
	color: #444;
	line-height: 1.8;
`;

const optionBox = css`
	margin-bottom: 18px;
`;

const optionLabel = css`
	font-size: 13px;
	font-weight: 700;
	color: #222;
	margin-bottom: 8px;
`;

const selectBox = css`
	width: 100%;
	height: 42px;
	border: 1px solid #d4d4d4;
	padding: 0 12px;
	font-size: 14px;
	color: #555;
	background: #fff;
	outline: none;
`;

const cartButton = css`
	width: 100%;
	height: 52px;
	border: none;
	background: #9aac85;
	color: #fff;
	font-size: 16px;
	font-weight: 700;
	cursor: pointer;
`;

const detailSection = css`
	background: #fff;
	border: 1px solid #e3e3e3;
	padding: 40px 0;
	text-align: center;
`;

const detailImage = css`
	max-width: 100%;
	display: block;
	margin: 0 auto;
`;

const messageStyle = css`
	padding: 100px 20px;
	text-align: center;
	font-size: 18px;
	color: #444;
`;
