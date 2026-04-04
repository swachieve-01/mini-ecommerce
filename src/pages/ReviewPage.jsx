import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Section } from "../styles/SectionStyle";
import Pagination from "../components/ui/Pagination";
import { Link } from "react-router-dom";
import ReviewItem from "../components/review/ReviewItem.jsx";
import reviewDatas from "../data/reviewDatas";
import Modal from "../components/ui/Modal.jsx";

// 레이아웃
const PageContainer = styled(Section)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg};

  @media (max-width: 1024px) {
    padding: 60px 0;
  }
`;

const CustomSectionTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize.xxxl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.primaryDark};
  text-align: left;
  margin: 10px 0 20px 0;
`;

const ReviewSubHeader = styled.div`
  width: 95%;
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -20px;
    width: 100%;
    height: 3px;
    background: #8fa77e;
  }

  @media (max-width: 1024px) {
    align-items: center;
    gap: 20px;
  }
`;

const MainNotice = styled.p`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: #666;
`;

const SubNotice = styled.p`
  font-size: 13px;
  color: #8aa08a;
`;

const MoreLink = styled(Link)`
  align-self: flex-end;
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  color: #8fa77e;
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ReviewList = styled.div`
  width: 100%;
  max-width: 1440px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ArrowButton = styled.button`
  width: 44px;
  height: 44px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  color: #fff;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  line-height: 1;
  padding: 0;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }

  ${({ direction }) => (direction === "left" ? "left: 12px;" : "right: 12px;")}
`;

const ReviewModalCard = styled.div`
  background: #fff;
  overflow: hidden;
`;

const ReviewImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 420px;
  background: #f5f5f5;
  border-radius: 16px 16px 0 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OverlayInfo = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  color: #fff;

  .name {
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 4px;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .score {
    font-size: 20px;
    font-weight: 500;
  }

  .stars {
    display: flex;
    gap: 2px;
  }
`;

const ReviewBody = styled.div`
  padding: 24px;
`;

const ReviewTitleBig = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #2f3e2f;
  margin-bottom: 12px;
`;

const ReviewMeta = styled.div`
  font-size: 13px;
  color: #888;
  margin-bottom: 16px;
`;

const ReviewText = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: #555;
`;

const StarIcon = ({ filled = true }) => (
  <svg width="14" height="14" viewBox="0 0 24 24">
    <path
      d="M12 17.3l-5.4 3.2 1.5-6.2-4.8-4.2 6.3-.5L12 4l2.4 5.8 6.3.5-4.8 4.2 1.5 6.2z"
      fill={filled ? "#8fa77e " : "none"}
      stroke="#8fa77e "
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================
   컴포넌트
========================= */
export default function ReviewPage() {
  // 현재 패이지
  const [currentPage, setCurrentPage] = useState(1);

  // 선택된 리뷰(모달에 표시)
  const [selectedReview, setSelectedReview] = useState(null);

  // 모달 열림 여부
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 현재 보고 있는 이미지 index
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // 페이지당 보여줄 리뷰 개수 (매직 넘버 방지)
  const ITEMS_PER_PAGE = 5;

  // 전체 페이지 수 계산 (데이터 길이 기반)
  // 최소 1페이지 유지 (데이터 없을 경우 대비)
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(reviewDatas.length / ITEMS_PER_PAGE)),
    [],
  );

  // 현재 페이지에 해당하는 리뷰 리스트
  // 페이지 변경 시에만 재계산
  const currentReviews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return reviewDatas.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  // 선택된 리뷰의 이미지 개수 (optional chaining으로 안전하게 처리)
  const imageLength = selectedReview?.images?.length ?? 0;

  // 리뷰 클릭 시 모달 열기 + 이미지 index 초기화
  const openModal = useCallback((review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
    setCurrentImgIdx(0);
  }, []);

  // 모달 닫기
  const closeModal = useCallback(() => {
    setSelectedReview(null);
    setIsModalOpen(false);
  }, []);

  // 다음 이미지 (마지막에서 다시 처음으로 순환)
  const nextImg = useCallback(() => {
    if (!imageLength) return;
    setCurrentImgIdx((prev) => (prev + 1) % imageLength);
  }, [imageLength]);

  // 이전 이미지 (첫 이미지에서 마지막으로 순환)
  const prevImg = useCallback(() => {
    if (!imageLength) return;
    setCurrentImgIdx((prev) => (prev - 1 + imageLength) % imageLength);
  }, [imageLength]);

  useEffect(() => {
    if (!isModalOpen) return;

    // 모달 키보드 인식
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevImg();
      else if (e.key === "ArrowRight") nextImg();
      else if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);

    // cleanup: 모달 닫히거나 컴포넌트 unmount 시 이벤트 제거
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, prevImg, nextImg, closeModal]);

  return (
    <PageContainer>
      <ReviewSubHeader>
        <CustomSectionTitle>고객 리뷰</CustomSectionTitle>
        <MainNotice>
          상품 정보 및 가격은 내부 사정에 따라 변경될 수 있습니다.
        </MainNotice>
        <SubNotice>※ 실제 구매 후기이며 개인차가 있을 수 있습니다.</SubNotice>
        <MoreLink to="/products">상품 더보러가기 →</MoreLink>
      </ReviewSubHeader>

      {/*  핵심 변경 부분 */}
      <ReviewList>
        {currentReviews.map((review) => (
          <ReviewItem key={review.id} review={review} onOpenModal={openModal} />
        ))}
      </ReviewList>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} imageMode={true}>
        {selectedReview && (
          <ReviewModalCard>
            <ReviewImageBox>
              <img
                src={selectedReview.images?.[currentImgIdx]}
                alt={selectedReview.title || "리뷰 이미지"}
              />

              {imageLength > 1 && (
                <>
                  <ArrowButton direction="left" onClick={prevImg}>
                    &#10094;
                  </ArrowButton>
                  <ArrowButton direction="right" onClick={nextImg}>
                    &#10095;
                  </ArrowButton>
                </>
              )}

              {/* 이미지 위 정보 */}
              <OverlayInfo>
                <div className="name">{selectedReview.productName}</div>

                <div className="rating">
                  <span className="score">
                    {Number(selectedReview.rating).toFixed(1)}
                  </span>

                  <div className="stars">
                    {[...Array(selectedReview.rating)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                </div>
              </OverlayInfo>
            </ReviewImageBox>

            {/* 리뷰 카드 영역 */}
            <ReviewBody>
              <ReviewTitleBig>{selectedReview.title}</ReviewTitleBig>

              <ReviewMeta>
                {selectedReview.userId} · {selectedReview.date}
              </ReviewMeta>

              <ReviewText>{selectedReview.content}</ReviewText>
            </ReviewBody>
          </ReviewModalCard>
        )}
      </Modal>
    </PageContainer>
  );
}
