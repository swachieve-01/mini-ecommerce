/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../api/product";
import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";
import Modal from "../components/ui/Modal";
import { Button } from "../components/ui/Button";
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
  const location = useLocation();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedOption, setSelectedOption] = useState("기본 옵션");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setError(err.message || "오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

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

  const handlePrevThumbnail = () => {
    if (!thumbImages.length) return;

    const currentIndex = thumbImages.findIndex(
      (image) => image === selectedImage,
    );

    const prevIndex =
      currentIndex <= 0 ? thumbImages.length - 1 : currentIndex - 1;

    setSelectedImage(thumbImages[prevIndex]);
  };

  const openModal = () => {
    if (!selectedImage) return;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: salePrice,
      originPrice,
      image: selectedImage,
      option: selectedOption,
      quantity,
    });

    navigate("/cart");
  };

  if (loading) {
    return <div css={messageStyle}>로딩 중...</div>;
  }

  if (error || !product) {
    return <div css={messageStyle}>{error || "상품 정보가 없습니다."}</div>;
  }

  return (
    <>
      <div css={pageWrap}>
        <div css={sheet}>
          <section css={topSection}>
            <div css={leftArea}>
              <div css={mainImageStage}>
                {thumbImages.length > 1 && (
                  <button
                    type="button"
                    css={imageNavButton("left")}
                    onClick={handlePrevThumbnail}
                    aria-label="이전 이미지 보기"
                  >
                    ‹
                  </button>
                )}

                <div
                  css={mainImageBox}
                  onClick={openModal}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      openModal();
                    }
                  }}
                  aria-label="상품 이미지 크게 보기"
                >
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt={product.name}
                      css={mainImage}
                    />
                  ) : (
                    <div css={emptyImage}>이미지가 없습니다.</div>
                  )}
                </div>

                {thumbImages.length > 1 && (
                  <button
                    type="button"
                    css={imageNavButton("right")}
                    onClick={handleNextThumbnail}
                    aria-label="다음 이미지 보기"
                  >
                    ›
                  </button>
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
              </div>
            </div>

            <div css={rightArea}>
              <h1 css={titleText}>{product.name}</h1>

              <div
                css={ratingRow}
                onClick={() => navigate(`/reviews?productId=${product.id}`)}
                style={{ cursor: "pointer" }}
              >
                <span css={stars}>★★★★★</span>
                <span css={count}>
                  {rating}
                  {reviewCount > 0 ? ` (${reviewCount})` : ""}
                </span>
              </div>
              <div css={priceArea}>
                <div css={priceRow}>
                  <span css={salePriceText}>
                    {salePrice.toLocaleString()}원
                  </span>

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
                <div css={infoLine}>
                  <span css={dot} />
                  <span>
                    {product.deliveryInfo || (
                      <>
                        배송정보, 무료배송 <strong>(당일 배송 가능)</strong>
                      </>
                    )}
                  </span>
                </div>

                <div css={infoLine}>
                  <span css={dot} />
                  <span>
                    {product.pointInfo || (
                      <>
                        적립금, 혜택 <strong>(0.4%)</strong>
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div css={guideBox}>
                <div css={guideTitle}>배송안내</div>

                <ul css={guideList}>
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

              <div css={optionSection}>
                <p css={optionLabel}>옵션 선택</p>

                <select
                  css={selectBox}
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  {product.options?.length ? (
                    product.options.map((opt, i) => (
                      <option key={`${opt}-${i}`} value={opt}>
                        {opt}
                      </option>
                    ))
                  ) : (
                    <option value="기본 옵션">기본 옵션</option>
                  )}
                </select>

                <div css={cartActionRow}>
                  <div css={quantityRow}>
                    <button
                      type="button"
                      onClick={handleDecreaseQuantity}
                      aria-label="수량 감소"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => {
                        const value = e.target.value;

                        // 1. 빈값이면 무시 (입력 중 허용)
                        if (value === "") return;

                        // 2. 숫자로 변환
                        const nextValue = Number(value);

                        // 3. 최소값 방어
                        if (nextValue < 1) {
                          setQuantity(1);
                          return;
                        }

                        setQuantity(nextValue);
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleIncreaseQuantity}
                      aria-label="수량 증가"
                    >
                      +
                    </button>
                  </div>
                  <div css={cartButtonWrap}>
                    <Button
                      width="100%"
                      height="100%"
                      bgColor="primary"
                      textColor="white"
                      fontSize="lg"
                      fontWeight="medium"
                      radius="sm"
                      onClick={handleAddToCart}
                    >
                      장바구니 담기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section css={detailSection}>
            {detailImages.length > 0 ? (
              detailImages.map((img, i) => (
                <img
                  key={`${img}-${i}`}
                  src={img}
                  alt={`${product.name} 상세 이미지 ${i + 1}`}
                  css={fullDetailImage}
                />
              ))
            ) : (
              <div css={emptyDetailBox}>상세 이미지가 없습니다.</div>
            )}
          </section>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="" imageMode>
        <div css={modalImageWrap}>
          {thumbImages.length > 1 && (
            <button
              type="button"
              css={modalNavButton("left")}
              onClick={handlePrevThumbnail}
              aria-label="이전 이미지 보기"
            >
              ‹
            </button>
          )}

          <img src={selectedImage} alt={product.name} css={modalImage} />

          {thumbImages.length > 1 && (
            <button
              type="button"
              css={modalNavButton("right")}
              onClick={handleNextThumbnail}
              aria-label="다음 이미지 보기"
            >
              ›
            </button>
          )}
        </div>
      </Modal>
    </>
  );
}

/* ================= 스타일 ================= */

const pageWrap = css`
  background: ${theme.colors.gray100};
  min-height: 100vh;
  padding: 100px 0 40px;

  @media (max-width: 1280px) {
    padding: 80px 0 32px;
  }

  ${theme.media.tablet} {
    padding: 64px 0 28px;
  }

  ${theme.media.mobile} {
    padding: 24px 0 20px;
  }
`;

const sheet = css`
  width: min(1440px, calc(100% - 48px));
  margin: 0 auto;
  padding: 54px 0 20px;
  border: ${theme.border.thin};
  background: ${theme.colors.bg};

  @media (max-width: 1280px) {
    width: calc(100% - 32px);
    padding: 40px 0 20px;
  }

  ${theme.media.tablet} {
    width: calc(100% - 24px);
    padding: 32px 0 20px;
  }

  ${theme.media.mobile} {
    width: calc(100% - 16px);
    padding: 24px 0 20px;
    border: none;
  }
`;

const topSection = css`
  width: min(1240px, calc(100% - 96px));
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 96px;

  @media (max-width: 1280px) {
    width: calc(100% - 48px);
    gap: 40px;
  }

  ${theme.media.tablet} {
    width: calc(100% - 32px);
    gap: 28px;
  }

  ${theme.media.mobile} {
    width: calc(100% - 24px);
    flex-direction: column;
    gap: 20px;
  }
`;

const leftArea = css`
  flex: 1 1 0;
  min-width: 0;
  max-width: 657px;

  ${theme.media.mobile} {
    width: 100%;
    max-width: none;
  }
`;

const mainImageStage = css`
  position: relative;
  width: 100%;
  margin-bottom: 12px;
`;

const mainImageBox = css`
  width: 100%;
  aspect-ratio: 657 / 744;
  background: ${theme.colors.gray100};
  overflow: hidden;
  cursor: zoom-in;
  transition: box-shadow 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.28s ease;
  }

  &:hover {
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  }

  &:hover img {
    transform: scale(1.02);
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
  color: ${theme.colors.textSub};
  background: ${theme.colors.gray100};
`;

const imageNavButton = (position = "right") => css`
  position: absolute;
  top: 50%;
  ${position}: -52px;
  transform: translateY(-50%);
  width: 28px;
  height: 56px;
  border: none;
  background: transparent;
  color: #8f8f8f;
  font-size: 44px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition:
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: ${theme.colors.primaryDark};
    transform: translateY(-50%) scale(1.05);
  }

  @media (max-width: 1280px) {
    ${position}: -32px;
    font-size: 36px;
  }

  ${theme.media.tablet} {
    ${position}: 8px;
    width: 28px;
    height: 48px;
    font-size: 30px;
    background: rgba(255, 255, 255, 0.72);
    border-radius: ${theme.radius.pill};
  }

  ${theme.media.mobile} {
    ${position}: 10px;
    width: 22px;
    height: 42px;
    font-size: 28px;
    background: rgba(255, 255, 255, 0.72);
    border-radius: ${theme.radius.pill};
  }
`;

const thumbArea = css`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const thumbRow = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const thumbButton = (active) => css`
  width: 60px;
  height: 60px;
  padding: 0;
  border: ${active ? `2px solid ${theme.colors.primary}` : "1px solid #ddd"};
  background: ${theme.colors.bg};
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${theme.colors.primary};
  }

  ${theme.media.tablet} {
    width: 52px;
    height: 52px;
  }

  ${theme.media.mobile} {
    width: 48px;
    height: 48px;
  }
`;

const thumbImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const rightArea = css`
  flex: 0 1 390px;
  min-width: 320px;
  max-width: 390px;
  display: flex;
  flex-direction: column;
  padding-top: 42px;

  @media (max-width: 1280px) {
    min-width: 300px;
    padding-top: 16px;
  }

  ${theme.media.mobile} {
    width: 100%;
    min-width: 0;
    max-width: none;
    padding-top: 0;
  }
`;

const titleText = css`
  margin: 0 0 7px;
  font-size: 24px;
  line-height: 1.25;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textMain};
  word-break: keep-all;

  @media (max-width: 1280px) {
    font-size: 22px;
  }

  ${theme.media.mobile} {
    font-size: 20px;
    margin-bottom: 5px;
  }
`;

const ratingRow = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  flex-wrap: wrap;
`;

const stars = css`
  color: ${theme.colors.stars};
  font-size: 14px;
`;

const count = css`
  color: ${theme.colors.textSub};
  font-size: 13px;
  font-weight: ${theme.fontWeight.medium};
`;

const priceArea = css`
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const priceRow = css`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const salePriceText = css`
  font-size: 28px;
  line-height: 1;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.sale};

  @media (max-width: 1280px) {
    font-size: 26px;
  }

  ${theme.media.mobile} {
    font-size: 24px;
  }
`;

const originPriceText = css`
  font-size: 14px;
  color: ${theme.colors.textSub};
  text-decoration: line-through;
`;

const discountBadge = css`
  min-width: 60px;
  height: 20px;
  padding: 0 10px;
  border-radius: 18px;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: ${theme.fontWeight.bold};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const infoList = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 26px;
  padding-bottom: 22px;
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const infoLine = css`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  line-height: 1.55;
  color: ${theme.colors.textMain};

  strong {
    color: ${theme.colors.textSub};
  }
`;

const dot = css`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #555;
  flex-shrink: 0;
`;

const guideBox = css`
  width: 100%;
  background: #f5f5f5;
  border: 1px solid #ddd;
  margin-bottom: 24px;
  min-height: 146px;

  ${theme.media.mobile} {
    min-height: auto;
  }
`;

const guideTitle = css`
  padding: 12px 14px;
  font-size: 14px;
  font-weight: ${theme.fontWeight.bold};
  border-bottom: 1px solid #ddd;
  color: ${theme.colors.textMain};
`;

const guideList = css`
  margin: 0;
  padding: 18px 18px 18px 32px;
  font-size: 12px;
  line-height: 1.9;
  color: #777;

  li + li {
    margin-top: 8px;
  }

  ${theme.media.mobile} {
    padding: 16px 16px 16px 28px;
  }
`;

const optionSection = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 22px;
  border-top: 1px solid ${theme.colors.gray200};
`;

const optionLabel = css`
  margin: 0;
  font-size: 14px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textMain};
`;

const selectBox = css`
  width: 100%;
  height: 45px;
  padding: 0 48px 0 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  background-color: ${theme.colors.bg};
  background-image: url("data:image/svg+xml,%3Csvg width='14' height='9' viewBox='0 0 14 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L7 7.5L13 1.5' stroke='%23888888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 18px center;
  background-size: 14px 9px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const cartActionRow = css`
  display: flex;
  align-items: stretch;
  gap: 12px;
  width: 100%;
  margin-top: 10px;

  ${theme.media.mobile} {
    gap: 8px;
  }
`;

const quantityRow = css`
  width: 96px;
  height: 56px;
  display: flex;
  border: 1px solid #ccc;
  background: ${theme.colors.bg};
  flex-shrink: 0;

  button {
    width: 32px;
    height: 100%;
    border: none;
    background: ${theme.colors.bg};
    cursor: pointer;
    font-size: 20px;
  }

  input {
    width: 32px;
    height: 100%;
    border: none;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    text-align: center;
    font-size: 18px;
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.textMain};
    background: ${theme.colors.bg};
    outline: none;
    padding: 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;
  }

  ${theme.media.mobile} {
    width: 84px;
    height: 42px;

    button,
    input {
      width: 28px;
      font-size: 16px;
    }
  }
`;
const cartButtonWrap = css`
  flex: 1;
  height: 56px;
  min-width: 0;

  ${theme.media.mobile} {
    height: 42px;
  }
`;

const detailSection = css`
  width: min(1019px, calc(100% - 48px));
  margin: 24px auto 0;
  text-align: center;

  ${theme.media.tablet} {
    width: calc(100% - 32px);
  }

  ${theme.media.mobile} {
    width: calc(100% - 24px);
    margin-top: 16px;
  }
`;

const fullDetailImage = css`
  width: 100%;
  max-width: 1019px;
  display: block;
  margin: 0 auto 20px;
`;

const emptyDetailBox = css`
  width: 100%;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.bg};
  color: ${theme.colors.textSub};
  font-size: ${theme.fontSize.lg};

  ${theme.media.mobile} {
    min-height: 260px;
    font-size: ${theme.fontSize.base};
  }
`;

const messageStyle = css`
  text-align: center;
  padding: 100px 20px;
  font-size: 20px;
  color: ${theme.colors.textSub};
`;

const modalImageWrap = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const modalImage = css`
  max-width: min(90vw, 980px);
  max-height: 90vh;
  display: block;
  object-fit: contain;
  background: ${theme.colors.bg};
`;

const modalNavButton = (position = "right") => css`
  position: absolute;
  top: 50%;
  ${position}: 12px;
  transform: translateY(-50%);
  width: 34px;
  height: 56px;
  border: none;
  background: rgba(0, 0, 0, 0.35);
  color: ${theme.colors.white};
  font-size: 40px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radius.pill};

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  ${theme.media.mobile} {
    width: 28px;
    height: 44px;
    font-size: 28px;
  }
`;
