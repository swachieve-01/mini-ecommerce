import React, { useState } from "react";
import styled from "@emotion/styled";
import { Section, SectionTitle } from "../styles/SectionStyle";

import Pagination from "../components/ui/Pagination";

import { Link } from "react-router-dom"; // 페이지 이동을 위해 필요
import ReviewItem from "../components/Review/ReviewItem";
import reviewDatas from "../data/reviewDatas";

const PageContainer = styled(Section)`
  width: 100%;
  min-height: 2000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
  background-color: #fff;
`;

// 상단 안내 문구 영역
const ReviewSubHeader = styled.div`
  width: 95%;
  max-width: 1280px;
  margin: 0 auto 30px;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #000; /* 영상 속 하단 검은 선 느낌 재현 */
  padding-bottom: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const ReviewList = styled.div`
  width: 95%;
  max-width: 1280px;
  min-height: auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;
  margin-bottom: 100px;
`;

const NoticeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
`;

const ReviewImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1; /* 가로세로 1:1 비율 고정 */
  object-fit: cover; /* 비율을 유지하며 영역을 채움 */
`;

const ReviewCard = styled.div`
  display: flex;
  flex-direction: row; /* PC 기본 */

  @media (max-width: 768px) {
    flex-direction: column; /* 모바일에서 세로로 */
    margin-bottom: 60px;
    gap: 40px;
  }
`;

const MainNotice = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: #333;
`;

const SubNotice = styled.p`
  font-size: 14px;
  color: #999;
`;

const MoreLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

export default function ReviewPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 전체 페이지 수 계산 (리뷰 총 개수 /  한 페이지당 개수)
  const totalPages = Math.ceil(reviewDatas.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = reviewDatas.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <PageContainer>
      <SectionTitle>고객 리뷰</SectionTitle>

      <ReviewSubHeader>
        <NoticeGroup>
          <MainNotice>
            상품 정보 및 가격은 내부 사정에 따라 변경될 수 있습니다.
          </MainNotice>
          <SubNotice>
            ※ 상품 후기는 실제 구매 고객이 작성한 내용이며 개인의 경험에 따라
            차이가 있을 수 있습니다.
          </SubNotice>
        </NoticeGroup>

        <MoreLink to="/products">상품 더보러가기 →</MoreLink>
      </ReviewSubHeader>

      <ReviewList>
        {currentReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ReviewList>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
}
