import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Section } from "../styles/SectionStyle";
import Pagination from "../components/ui/Pagination";
import { Link } from "react-router-dom";
import ReviewItem from "../components/Review/ReviewItem";
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
  padding: 100px 0;
  background-color: ${(props) => props.theme.colors.bg};

  @media (max-width: 1024px) {
    padding: 60px 0;
  }
`;

const CustomSectionTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize.displayMd};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.primaryDark};
  margin-bottom: 40px;
  text-align: center;
`;

const ReviewSubHeader = styled.div`
  width: 95%;
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: 0 auto 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid ${(props) => props.theme.colors.black};
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const MainNotice = styled.p`
  font-size: ${(props) => props.theme.fontSize.xxl};
`;

const SubNotice = styled.p`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.textSub};
`;

const MoreLink = styled(Link)`
  align-self: flex-end;
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontWeight.semibold};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ReviewList = styled.div`
  width: 95%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

/* =========================
   모달
========================= */
const ModalImageWrapper = styled.div`
  position: relative;
  width: 100%;
  background: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  ${(props) => (props.direction === "left" ? "left: 10px;" : "right: 10px;")}
`;

const DetailInfoBox = styled.div`
  margin-top: 20px;
  padding: 25px;
  background: #fff;
  border-radius: 12px;
`;

const SectionBlock = styled.div`
  border-top: 1px solid #eee;
  padding: 15px 0;

  &:first-of-type {
    border-top: none;
  }
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
      <CustomSectionTitle>고객 리뷰</CustomSectionTitle>

      <ReviewSubHeader>
        <MainNotice>
          상품 정보 및 가격은 내부 사정에 따라 변경될 수 있습니다.
        </MainNotice>
        <SubNotice>※ 실제 구매 후기이며 개인차가 있을 수 있습니다.</SubNotice>
        <MoreLink to="/products">상품 더보러가기 →</MoreLink>
      </ReviewSubHeader>

      {/* ✅ 핵심 변경 부분 */}
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

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedReview?.productName}
      >
        {selectedReview && (
          <>
            <ModalImageWrapper>
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
              <ModalImage src={selectedReview.images?.[currentImgIdx]} />
            </ModalImageWrapper>

            <DetailInfoBox>
              <SectionBlock>⭐ {selectedReview.rating}</SectionBlock>

              <SectionBlock>
                ID: {selectedReview.userId} | {selectedReview.date}
              </SectionBlock>

              <SectionBlock>
                <h4>{selectedReview.title}</h4>
                <p>{selectedReview.content}</p>
              </SectionBlock>
            </DetailInfoBox>
          </>
        )}
      </Modal>
    </PageContainer>
  );
}
