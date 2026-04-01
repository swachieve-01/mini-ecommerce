import React, { useState } from "react";
import styled from "@emotion/styled";
import { Section } from "../styles/SectionStyle"; // SectionTitle은 아래에서 커스텀해서 사용
import Pagination from "../components/ui/Pagination";
import { Link } from "react-router-dom";
import ReviewItem from "../components/Review/ReviewItem";
import reviewDatas from "../data/reviewDatas";

const PageContainer = styled(Section)`
  width: 100%;
  min-height: auto; /* 내용에 맞게 조절되도록 수정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0; /* theme.spacing.section 느낌 반영 */
  background-color: ${(props) => props.theme.colors.bg};

  @media (max-width: 1024px) {
    padding: 60px 0;
  }
`;

/* 커스텀 섹션 타이틀 (스크린샷의 '스킨케어' 느낌 재현) */
const CustomSectionTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize.displayMd}; /* 40px */
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.primaryDark}; /* 녹색 계열 */
  margin-bottom: 20px;
  text-align: center;
  padding-bottom: 60px;

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSize.xxxl}; /* 모바일 대응 */
    padding-bottom: 40px;
  }
`;

const ReviewSubHeader = styled.div`
  width: 95%;
  max-width: ${(props) => props.theme.layout.maxWidth}; /* 1440px */
  margin: 0 auto 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid ${(props) => props.theme.colors.black}; /* 두꺼운 실선 */
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center; /* 모바일 중앙 정렬 */
    gap: 20px;
  }
`;

const NoticeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MainNotice = styled.p`
  font-size: ${(props) => props.theme.fontSize.xxl}; /* 24px */
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.colors.textMain};

  @media (max-width: 1024px) {
    font-size: ${(props) => props.theme.fontSize.xl};
  }
`;

const SubNotice = styled.p`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.textSub};
`;

const MoreLink = styled(Link)`
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  color: ${(props) => props.theme.colors.textMain};
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: ${(props) => props.theme.transition.fast};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const ReviewList = styled.div`
  width: 95%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 40px; /* 리뷰 간 간격 */
  margin-bottom: 80px;
`;

export default function ReviewPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(reviewDatas.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = reviewDatas.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <PageContainer>
      {/* 1. 상단 제목 영역 (스킨케어 페이지 스타일 인용) */}
      <CustomSectionTitle>고객 리뷰</CustomSectionTitle>

      {/* 2. 안내 및 링크 영역 */}
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

      {/* 3. 리뷰 리스트 영역 */}
      <ReviewList>
        {currentReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ReviewList>

      {/* 4. 페이지네이션 */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
}
