import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../api/product";
import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";
import useToastStore from "../stores/useToastStore";
import Modal from "../components/ui/Modal";
import { Button } from "../components/ui/Button";
import theme from "../styles/theme";
import { useLoadingStore } from "../stores/useLoadingStore";
import { useWishStore } from "../stores/WishlisStore";
import styled from "@emotion/styled";
import productDetailList from "../data/productDetails";

// 페이지 전체 배경 영역 (회색 배경 + 전체 패딩)
const ProductDetailPageWrap = styled.div`
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

// 가운데 흰색 컨텐츠 박스
const ProductDetailSheet = styled.div`
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

//  상단 메인 레이아웃 (좌: 이미지 / 우: 상품정보)
const TopSection = styled.section`
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

// 왼쪽 이미지 전체 영역
const ProductDetailLeftArea = styled.div`
  flex: 0 0 680px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  ${theme.media.mobile} {
    width: 100%;
    max-width: none;
  }
`;

// 메인 이미지 + 좌우 버튼 감싸는 영역
const MainImageStage = styled.div`
  position: relative;
  width: 100%;
  /* margin-bottom: 12px; */
`;

// 메인 이미지 박스 (hover 확대 효과 있음)
const MainImageBox = styled.div`
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

// 실제 메인 이미지
const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

//  이미지 없을 때 표시
const EmptyImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textSub};
  background: ${theme.colors.gray100};
`;

// 이미지 좌우 이동 버튼 공통
const ImageNavButton = styled.button`
  position: absolute;
  top: 50%;
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

  &:hover {
    color: ${theme.colors.primaryDark};
  }
`;

const ImageNavButtonLeft = styled(ImageNavButton)`
  left: -52px;
`;

const ImageNavButtonRight = styled(ImageNavButton)`
  right: -52px;
`;

// 썸네일 전체 영역
const ThumbArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

// 썸네일 리스트 묶음
const ThumbRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

// 개별 썸네일 버튼 선택 시
const ThumbButton = styled.button`
  width: 60px;
  height: 60px;
  padding: 0;
  margin-bottom: 55px;
  border: ${({ active }) =>
    active ? `2px solid ${theme.colors.primary}` : "1px solid #ddd"};
  background: ${theme.colors.bg};
  cursor: pointer;
  overflow: hidden;
`;

// 썸네일 이미지
const ThumbImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;

// 오른쪽 상품 정보 전체 영역
const ProductDetailRightArea = styled.div`
  flex: 0 0 420px;

  display: flex;
  flex-direction: column;
  gap: 18px;
`;

// 상품명
const TitleText = styled.h2`
  margin: 15px 0 0;
  font-size: 24px;
  font-weight: ${theme.fontWeight.bold};
`;

// 별점 + 리뷰수 영역
const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 100%;
    height: 2px;
    background: #eee;
  }
`;

// 별 색상
const Stars = styled.span`
  color: ${theme.colors.stars};
  cursor: pointer;
`;

// 리뷰 개수 텍스트
const ProductDetailReviewCount = styled.span`
  color: ${theme.colors.textSub};
  cursor: pointer;
`;

// 가격 영역 전체
const PriceArea = styled.div`
  /* padding: 16px 0; */
`;

// 가격 한 줄 (할인가 + 원가 + 할인율)
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

//  할인된 가격
const SalePriceText = styled.span`
  font-size: 30px;
  font-weight: 700;
  color: #e60023;
`;

//  원래 가격 (취소선)
const OriginPriceText = styled.span`
  font-size: 14px;
  color: #aaa;
  text-decoration: line-through;
`;

//  할인 퍼센트 배지
const DiscountBadge = styled.span`
  background: #8fa77e;
  color: white;
  font-size: 12px;
  padding: 2px 18px;
  border-radius: 12px;
`;

// 상품 설명
const DescriptionText = styled.p`
  font-size: 12px;
`;

// 배송/혜택 정보 전체
const InfoList = styled.div`
  position: relative;
  margin: 15px 0 35px 0;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -20px;
    width: 100%;
    height: 2px;
    background: #eee;
  }
`;

// 정보 한 줄
const InfoLine = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

// 앞에 붙는 점 표시
const ProductDetailInfoDot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #555;
  margin-right: 15px;
`;

// 배송 안내 박스
const GuideBox = styled.div`
  padding: 8px;
  background: #f5f5f5;
  border: 1px solid #ddd;
`;

// 배송 안내 제목
const GuideTitle = styled.div`
  padding: 10px 14px;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
`;

// 배송 안내 리스트
const GuideList = styled.ul`
  padding: 0 10px;
  font-size: 13px;
  position: relative;
  color: #666;

  li + li {
    margin-top: 6px;
  }
  margin: 15px 0 35px 0;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -70px;
    width: 100%;
    height: 2px;
    background: #eee;
  }
`;

// 옵션 전체 영역
const OptionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

//  옵션 라벨
const OptionLabel = styled.p`
  font-weight: 600;
  margin-top: 20px;
`;

//  옵션 선택 셀렉트 박스
const SelectBox = styled.select`
  height: 50px;
  border-radius: 4px;
  padding: 8px;
`;

//  버튼 영역 (찜 + 장바구니)
const CartActionRow = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

// 장바구니
const CartButton = styled.button`
  flex: 1;
  height: 48px;
  border-radius: 8px;
  border: none;
  background: #8fa77e;
  color: #fff;
  font-weight: 600;
  font-size: 15px;

  cursor: pointer;

  &:hover {
    background: #7a916a;
  }

  &:active {
    background: #6c825d;
  }
`;

// 수량 조절 박스
const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
`;

const QuantityInput = styled.input`
  width: 48px;
  height: 36px;
  border: none;
  text-align: center;
  font-size: 14px;

  outline: none;

  /* number 화살표 제거 */
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

// 찜 버튼 (하트 버튼)
const WishButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 25px;
    height: 25px;
  }
  svg path {
    stroke: #8fa77e;
    fill: ${({ active }) => (active ? "#8fa77e" : "none")};
  }
`;

// 수량 버튼
const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: #f7f7f7;
  font-size: 16px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #eee;
  }

  &:active {
    background: #e5e5e5;
  }
`;

//  상세 이미지 영역
const DetailSection = styled.section`
  width: 100%;
  height: 100%;
`;

//  상세 이미지
const FullDetailImage = styled.img`
  width: 100%;
  height: 100%;
`;

//  상세 이미지 없을 때
const EmptyDetailBox = styled.div`
  text-align: center;
`;

// 모달 이미지 영역
const ModalImageWrap = styled.div`
  display: flex;
  justify-content: center;
`;

//  모달 이미지
const ModalImage = styled.img`
  width: 100%;
  max-width: 600px;
`;

//  모달 좌우 버튼 공통
const ModalNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

// 모달 왼쪽 버튼
const ModalNavButtonLeft = styled(ModalNavButton)`
  left: 12px;
`;

//  모달 오른쪽 버튼
const ModalNavButtonRight = styled(ModalNavButton)`
  right: 12px;
`;

const DetailImageContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CopyOverlay = styled.div`
  position: absolute;
  top: 12%;
  left: 6%;
  color: #fff;
  z-index: 2;

  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
`;

const CopyTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const CopyDesc = styled.p`
  font-size: 16px;
`;

function toImageArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (value) return [value];
  return [];
}

export default function ProductDetailPage() {
  const showToast = useToastStore((state) => state.showToast);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { wishList, toggleWish } = useWishStore();
  const isWished = wishList.some((item) => item.id === product?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        startLoading();
        setError("");

        const result = await getProductDetail(id);
        const data = result.data;

        if (!result.success || !data) {
          throw new Error(result.message || "상품 정보를 불러오지 못했습니다.");
        }

        setProduct(data);

        const firstImage =
          data.thumbnails?.[0] || data.imageUrl || data.detailImage || "";

        setSelectedImage(firstImage);
      } catch (err) {
        setError(err.message || "오류가 발생했습니다.");
      } finally {
        stopLoading("상품을 불러오고 있어요");
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, startLoading, stopLoading]);

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
      ...toImageArray(product.imageUrl),
    ];

    return [...new Set(candidates)];
  }, [product]);

  const detailImages = useMemo(() => {
    if (!product) return [];

    return [...new Set(toImageArray(product.detailImage))];
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
    if (!product) return;

    // 무조건 담기
    addToCart({
      id: product.id,
      name: product.name,
      price: salePrice,
      originPrice,
      image: selectedImage || thumbImages?.[0] || "",
      option: "기본 옵션",
      quantity,
      category: product.categoryId || product.category || null,
    });
    // window.dispatchEvent(new Event("cartUpdated"));
    // 로그인 여부에 따라 토스트만 다르게

    if (isAuthenticated) {
      showToast(`${product.name} ${quantity}개가 장바구니에 저장되었습니다.`);
    } else {
      showToast("장바구니에 담겼습니다. 로그인하면 저장됩니다.");
    }
  };

  if (!product) return null;
  return (
    <>
      <ProductDetailPageWrap>
        <ProductDetailSheet>
          <TopSection>
            <ProductDetailLeftArea>
              <MainImageStage>
                {thumbImages.length > 1 && (
                  <ImageNavButtonLeft
                    type="button"
                    onClick={handlePrevThumbnail}
                    aria-label="이전 이미지 보기"
                  >
                    ‹
                  </ImageNavButtonLeft>
                )}

                <MainImageBox
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
                    <MainImage src={selectedImage} alt={product.name} />
                  ) : (
                    <EmptyImage>이미지가 없습니다.</EmptyImage>
                  )}
                </MainImageBox>

                {thumbImages.length > 1 && (
                  <ImageNavButtonRight
                    type="button"
                    onClick={handleNextThumbnail}
                    aria-label="다음 이미지 보기"
                  >
                    ›
                  </ImageNavButtonRight>
                )}
              </MainImageStage>

              <ThumbArea>
                <ThumbRow>
                  {thumbImages.map((image, index) => (
                    <ThumbButton
                      key={`${image}-${index}`}
                      type="button"
                      active={selectedImage === image}
                      onClick={() => setSelectedImage(image)}
                    >
                      <ThumbImage
                        src={image}
                        alt={`${product.name} 썸네일 ${index + 1}`}
                      />
                    </ThumbButton>
                  ))}
                </ThumbRow>
              </ThumbArea>
            </ProductDetailLeftArea>

            <ProductDetailRightArea>
              <TitleText>{product?.name}</TitleText>
              {product?.description ? (
                <DescriptionText>{product.description}</DescriptionText>
              ) : null}

              <RatingRow>
                <Stars
                  onClick={() => navigate(`/reviews?productId=${product.id}`)}
                >
                  ★★★★★
                </Stars>
                <ProductDetailReviewCount
                  onClick={() => navigate(`/reviews?productId=${product.id}`)}
                >
                  {rating}
                  {reviewCount > 0 ? ` (${reviewCount})` : ""}
                </ProductDetailReviewCount>
              </RatingRow>

              <PriceArea>
                <PriceRow>
                  <SalePriceText>{salePrice.toLocaleString()}원</SalePriceText>

                  {originPrice > salePrice && (
                    <OriginPriceText>
                      {originPrice.toLocaleString()}원
                    </OriginPriceText>
                  )}

                  {discountPercent > 0 && (
                    <DiscountBadge>{discountPercent}%</DiscountBadge>
                  )}
                </PriceRow>
              </PriceArea>

              <InfoList>
                <InfoLine>
                  <ProductDetailInfoDot />
                  <span>
                    배송정보, 무료배송 <strong>(당일 배송 가능)</strong>
                  </span>
                </InfoLine>

                <InfoLine>
                  <ProductDetailInfoDot />
                  <span>
                    적립금, 혜택 <strong>(0.4%)</strong>
                  </span>
                </InfoLine>
              </InfoList>

              <GuideBox>
                <GuideTitle>배송안내</GuideTitle>

                <GuideList>
                  <li>오후 3시 이전, 당일 배송</li>
                  <li>평균 배송기간 1~2일 소요</li>
                  <li>해당 서비스 가능 지역에 한함, 외 별도 추가비용</li>
                </GuideList>
              </GuideBox>

              <OptionSection>
                <OptionLabel>옵션 선택</OptionLabel>

                <SelectBox value="기본 옵션" disabled>
                  <option value="기본 옵션">기본 옵션</option>
                </SelectBox>

                {/* 수량  */}
                <QuantityRow>
                  <QuantityButton
                    type="button"
                    onClick={handleDecreaseQuantity}
                    aria-label="수량 감소"
                  >
                    -
                  </QuantityButton>

                  <QuantityInput
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "") {
                        setQuantity("");
                        return;
                      }
                      const nextValue = Number(value);

                      if (nextValue < 1) {
                        setQuantity(1);
                        return;
                      }

                      setQuantity(nextValue);
                    }}
                    onBlur={() => {
                      if (quantity === "" || Number(quantity) < 1) {
                        setQuantity(1);
                      }
                    }}
                  />

                  <QuantityButton
                    type="button"
                    onClick={handleIncreaseQuantity}
                    aria-label="수량 증가"
                  >
                    +
                  </QuantityButton>
                </QuantityRow>

                {/*  버튼  */}
                <CartActionRow>
                  <WishButton
                    active={isWished}
                    onClick={() =>
                      toggleWish({
                        id: product.id,
                        name: product.name,
                        price: salePrice,
                        imageUrl:
                          selectedImage ||
                          product.imageUrl ||
                          product.thumbnails?.[0] ||
                          "",
                      })
                    }
                  >
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M12 21s-6.5-4.35-9-8.5C1.5 8.5 3.5 5 7 5c2 0 3.5 1 5 2.5C13.5 6 15 5 17 5c3.5 0 5.5 3.5 4 7.5-2.5 4.15-9 8.5-9 8.5z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </WishButton>

                  <CartButton onClick={handleAddToCart}>
                    장바구니 담기
                  </CartButton>
                </CartActionRow>
              </OptionSection>
            </ProductDetailRightArea>
          </TopSection>

          <DetailSection>
            {detailImages.length > 0 ? (
              detailImages.map((img, i) => {
                const currentCopy = productDetailList[Number(id)]?.[i];

                return (
                  <DetailImageContainer key={`${img}-${i}`}>
                    <FullDetailImage
                      src={img}
                      alt={`${product.name} 상세 이미지 ${i + 1}`}
                    />

                    {currentCopy && (
                      <CopyOverlay>
                        <CopyTitle>{currentCopy.title}</CopyTitle>
                        <CopyDesc>{currentCopy.desc}</CopyDesc>
                      </CopyOverlay>
                    )}
                  </DetailImageContainer>
                );
              })
            ) : (
              <EmptyDetailBox>상세 이미지가 없습니다.</EmptyDetailBox>
            )}
          </DetailSection>
        </ProductDetailSheet>
      </ProductDetailPageWrap>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="" imageMode>
        <ModalImageWrap>
          {thumbImages.length > 1 && (
            <ModalNavButtonLeft type="button" onClick={handlePrevThumbnail}>
              ‹
            </ModalNavButtonLeft>
          )}

          <ModalImage src={selectedImage} alt={product.name} />

          {thumbImages.length > 1 && (
            <ModalNavButtonRight type="button" onClick={handleNextThumbnail}>
              ›
            </ModalNavButtonRight>
          )}
        </ModalImageWrap>
      </Modal>
    </>
  );
}
