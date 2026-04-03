import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Section } from "../styles/SectionStyle";
import Pagination from "../components/ui/Pagination";
import { Link } from "react-router-dom";
import ReviewItem from "../components/review/ReviewItem.jsx";
import reviewDatas from "../data/reviewDatas";
import Modal from "../components/ui/Modal.jsx";

/* =========================
   레이아웃
========================= */
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
  font-size: ${(props) => props.theme.fontSize.displayMd};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.primaryDark};
  text-align: left;
  margin: 20px 0 30px 0;
`;

const ReviewSubHeader = styled.div`
  width: 95%;
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;

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
  font-size: ${(props) => props.theme.fontSize.xl};
  color: #8fa77e;
`;

const SubNotice = styled.p`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.gray500};
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

/* =========================
   모달
========================= */
// const ModalImageWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   background: #f9f9f9;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalImage = styled.img`
//   max-width: 100%;
//   max-height: 60vh;
//   object-fit: contain;
// `;

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

// const DetailInfoBox = styled.div`
//   margin-top: 20px;
//   padding: 25px;
//   background: #fff;
//   border-radius: 12px;
// `;

// const SectionBlock = styled.div`
//   border-top: 1px solid #eee;
//   padding: 15px 0;

//   &:first-of-type {
//     border-top: none;
//   }
// `;
//
// ================  추가 스타일 ============================

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
  }

  .rating {
    margin-top: 4px;
    font-size: 18px;
    font-weight: bold;
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

/* =========================
   컴포넌트
========================= */
export default function ReviewPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(reviewDatas.length / itemsPerPage);

  const currentReviews = reviewDatas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const openModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
    setCurrentImgIdx(0);
  };

  const closeModal = () => {
    setSelectedReview(null);
    setIsModalOpen(false);
  };

  const nextImg = useCallback(() => {
    if (!selectedReview) return;
    setCurrentImgIdx((prev) => (prev + 1) % selectedReview.images.length);
  }, [selectedReview]);

  const prevImg = useCallback(() => {
    if (!selectedReview) return;
    setCurrentImgIdx(
      (prev) =>
        (prev - 1 + selectedReview.images.length) %
        selectedReview.images.length,
    );
  }, [selectedReview]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowLeft") prevImg();
      else if (e.key === "ArrowRight") nextImg();
      else if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, prevImg, nextImg]);

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
              <img src={selectedReview.images?.[currentImgIdx]} />

              {/* 화살표 유지 */}
              {selectedReview.images?.length > 1 && (
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
                <div className="rating">⭐ {selectedReview.rating}</div>
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
