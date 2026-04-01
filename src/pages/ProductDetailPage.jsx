/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
<<<<<<< HEAD
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../api/product";
import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";
import theme from "../styles/theme";

function toImageArray(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    return [value];
  }

  return [];
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToCart = useCartStore((state) => state.addToCart);

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

        const result = await getProductDetail(id);
        const data = result?.data ?? null;

        if (!result?.success || !data) {
          throw new Error(
            result?.message || "상품 정보를 불러오지 못했습니다.",
          );
        }

        setProduct(data);

        const firstImage =
          data.thumbnails?.[0] ||
          data.images?.[0] ||
          data.thumbnailUrls?.[0] ||
          data.imageUrl ||
          data.thumbnail ||
          data.detailImage ||
          data.descriptionImage ||
          "";

        setSelectedImage(firstImage);
        setSelectedOption(data.options?.[0] || "기본 옵션");
      } catch (err) {
        setError(err.message || "요청 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const thumbImages = useMemo(() => {
    if (!product) return [];

    const candidates = [
      ...toImageArray(product.thumbnails),
      ...toImageArray(product.images),
      ...toImageArray(product.thumbnailUrls),
      ...toImageArray(product.subImages),
      ...toImageArray(product.galleryImages),
      ...toImageArray(product.imageUrl),
      ...toImageArray(product.thumbnail),
    ];

    return [...new Set(candidates)];
  }, [product]);

  const detailImages = useMemo(() => {
    if (!product) return [];

    const candidates = [
      ...toImageArray(product.detailImages),
      ...toImageArray(product.detailImageUrls),
      ...toImageArray(product.descriptionImages),
      ...toImageArray(product.detailImage),
      ...toImageArray(product.descriptionImage),
      ...toImageArray(product.description),
    ];

    return [...new Set(candidates)];
  }, [product]);

  const salePrice = product?.discountPrice ?? product?.price ?? 0;
  const originPrice = product?.price ?? 0;
  const discountPercent = product?.discount
    ? Math.round(product.discount * 100)
    : 0;
  const rating = product?.rating ?? 0;
  const reviewCount = product?.reviewCount ?? 0;

  const handleNextThumbnail = () => {
    if (!thumbImages.length) return;

    const currentIndex = thumbImages.findIndex(
      (image) => image === selectedImage,
    );
    const nextIndex =
      currentIndex === -1 || currentIndex === thumbImages.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedImage(thumbImages[nextIndex]);
  };

  const handleReviewClick = () => {
    navigate("/reviews");
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: salePrice,
      originPrice,
      image: selectedImage,
      option: selectedOption,
      quantity: 1,
    });

    navigate("/cart");
  };

  if (loading) {
    return <div css={messageStyle}>로딩 중...</div>;
  }

  if (error) {
    return <div css={messageStyle}>{error}</div>;
  }

  if (!product) {
    return <div css={messageStyle}>상품 정보가 없습니다.</div>;
  }

  return (
    <div css={pageWrap}>
      <div css={inner}>
        <section css={topSection}>
          <div css={leftArea}>
            <div css={mainImageBox}>
              {selectedImage ? (
                <img src={selectedImage} alt={product.name} css={mainImage} />
              ) : (
                <div css={emptyImage}>이미지가 없습니다.</div>
              )}
            </div>

            <div css={thumbArea}>
              <div css={thumbRow}>
                {thumbImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    css={thumbButton(selectedImage === image)}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} 썸네일 ${index + 1}`}
                      css={thumbImage}
                    />
                  </button>
                ))}
              </div>

              {thumbImages.length > 1 && (
                <button
                  type="button"
                  css={thumbArrowButton}
                  onClick={handleNextThumbnail}
                  aria-label="다음 썸네일 보기"
                >
                  ›
                </button>
              )}
            </div>
          </div>

          <div css={rightArea}>
            <h1 css={title}>{product.name}</h1>

            <button
              type="button"
              css={ratingButton}
              onClick={handleReviewClick}
            >
              <span css={starText}>★★★★★</span>
              <span css={reviewText}>
                {rating}
                {reviewCount > 0 ? ` (${reviewCount})` : ""}
              </span>
            </button>

            <div css={priceArea}>
              <div css={priceRow}>
                <span css={salePriceText}>{salePrice.toLocaleString()}원</span>

                {originPrice > salePrice && (
                  <span css={originPriceText}>
                    {originPrice.toLocaleString()}원
                  </span>
                )}

                {discountPercent > 0 && (
                  <span css={discountBadge}>{discountPercent}%</span>
                )}
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
                  product.benefits.map((benefit, index) => (
                    <li key={`${benefit}-${index}`}>{benefit}</li>
                  ))
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

              <select
                css={selectBox}
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {product.options?.length ? (
                  product.options.map((option, index) => (
                    <option key={`${option}-${index}`} value={option}>
                      {option}
                    </option>
                  ))
                ) : (
                  <option value="기본 옵션">기본 옵션</option>
                )}
              </select>
            </div>

            <button type="button" css={cartButton} onClick={handleAddToCart}>
              장바구니 담기
            </button>
          </div>
        </section>

        <section css={detailSection}>
          {detailImages.length > 0 ? (
            detailImages.map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt={`${product.name} 상세 이미지 ${index + 1}`}
                css={detailImage}
              />
            ))
          ) : (
            <div css={emptyDetail}>상세 이미지가 없습니다.</div>
          )}
        </section>
      </div>
    </div>
  );
}

const pageWrap = css`
  background: ${theme.colors.gray100};
  min-height: 100vh;
  padding: 32px 0 80px;
`;

const inner = css`
  width: ${theme.container.width};
  max-width: ${theme.layout.maxWidth};
  margin: ${theme.container.margin};
  padding: ${theme.layout.padding};
`;

const topSection = css`
  display: flex;
  gap: 48px;
  background: ${theme.colors.bg};
  border: ${theme.border.thin};
  padding: 48px;
  margin-bottom: 48px;

  ${theme.media.tablet} {
    flex-direction: column;
    padding: 32px 24px;
  }

  ${theme.media.mobile} {
    gap: 32px;
    padding: 24px 16px;
  }
`;

const leftArea = css`
  flex: 1;
  min-width: 0;
`;

const mainImageBox = css`
  width: 100%;
  max-width: 520px;
  aspect-ratio: 1 / 1;
  background: ${theme.colors.gray100};
  overflow: hidden;
  margin-bottom: 16px;

  ${theme.media.tablet} {
    max-width: 100%;
  }
`;

const mainImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const emptyImage = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.textSub};
`;

const thumbArea = css`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const thumbRow = css`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const thumbButton = (active) => css`
  width: 52px;
  height: 52px;
  border: 1px solid ${active ? theme.colors.primary : theme.colors.border};
  background: ${theme.colors.bg};
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  transition: ${theme.transition.fast};

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const thumbImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const thumbArrowButton = css`
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: ${theme.colors.gray500};
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const rightArea = css`
  width: 360px;
  flex-shrink: 0;

  ${theme.media.tablet} {
    width: 100%;
  }
`;

const title = css`
  margin: 0 0 14px;
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textMain};
  line-height: 1.4;
  word-break: keep-all;
`;

const ratingButton = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const starText = css`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.stars};
  letter-spacing: 1px;
`;

const reviewText = css`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textSub};
`;

const priceArea = css`
  padding-bottom: 20px;
  border-bottom: 1px solid ${theme.colors.gray200};
  margin-bottom: 20px;
`;

const priceRow = css`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const salePriceText = css`
  font-size: 34px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.sale};
  line-height: 1;
`;

const originPriceText = css`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray500};
  text-decoration: line-through;
`;

const discountBadge = css`
  padding: 4px 10px;
  border-radius: ${theme.radius.pill};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
`;

const infoList = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${theme.colors.gray200};
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
  background: ${theme.colors.gray800};
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
`;

const infoText = css`
  margin: 0;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMain};
  line-height: 1.6;

  strong {
    font-weight: ${theme.fontWeight.bold};
  }
`;

const benefitBox = css`
  border: ${theme.border.thin};
  margin-bottom: 18px;
`;

const benefitTitle = css`
  padding: 10px 14px;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.bold};
  border-bottom: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.bgSoft};
  color: ${theme.colors.textMain};
`;

const benefitList = css`
  margin: 0;
  padding: 12px 18px 12px 28px;
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.gray600};
  line-height: 1.8;
`;

const optionBox = css`
  margin-bottom: 18px;
`;

const optionLabel = css`
  margin-bottom: 8px;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textMain};
`;

const selectBox = css`
  width: 100%;
  height: 42px;
  border: 1px solid ${theme.colors.borderFocus};
  padding: 0 12px;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray600};
  background: ${theme.colors.bg};
  outline: none;
`;

const cartButton = css`
  width: 100%;
  height: 52px;
  border: none;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  cursor: pointer;
  transition: ${theme.transition.fast};

  &:hover {
    opacity: ${theme.opacity.hover};
  }
`;

const detailSection = css`
  background: ${theme.colors.bg};
  border: ${theme.border.thin};
  padding: 40px 0;
  text-align: center;
`;

const detailImage = css`
  width: 100%;
  max-width: 720px;
  display: block;
  margin: 0 auto;

  & + & {
    margin-top: 24px;
  }
`;

const emptyDetail = css`
  padding: 80px 20px;
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.textSub};
`;

const messageStyle = css`
  padding: 100px 20px;
  text-align: center;
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.textSub};
=======
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
>>>>>>> 6956bb271c72846fde2c4f8f3a42f2b3b83df146
`;
