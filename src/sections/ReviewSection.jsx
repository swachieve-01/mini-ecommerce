import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Section, SectionTitle } from "../styles/SectionStyle";
import { getReviews } from "../api/main";
import { useNavigate } from "react-router-dom";

// 리뷰 카드 정렬
export const ReviewCardArea = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  justify-content: center;
  gap: 20px;
`;

//  리뷰 카드 박스
export const ReviewCard = styled.div`
  width: 100%;
  max-width: 280px;
  height: 100%;
  margin: 0 auto;
  padding: 22px;
  border-radius: ${({ theme }) => theme.radius.xxl};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.24);
  box-sizing: border-box;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  }
`;

// 리뷰 별 박스
export const RatingStars = styled.div`
  width: 100%;
  max-width: 88px;
  height: 16px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.stars};
`;

// 뱃지 부분
export const ReviewBadge = styled.div`
  width: 100%;
  max-width: 47px;
  height: 18px;
  color: ${({ theme }) => theme.badgeText.review};
  font-size: ${({ theme }) => theme.fontSize.xs};
  background-color: ${({ theme }) => theme.colors.reviewBadge};
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 카드 상단 정렬
export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

// 카드 상품명
export const ReviewProductName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  text-align: left;
  margin-bottom: 7px;
`;

// 카드 내용
export const ReviewContent = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  text-align: left;
  line-height: 1.5;

  /* 내용 3줄 ... 표시 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
`;

// 상품 이미지
export const ReviewImage = styled.img`
  width: 100%;
  height: 174px;
`;

// 상품 카드
export const ReviewCardId = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-align: start;
  margin-bottom: 25px;
`;

// 상품 내용
export const ReviewCardDate = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-align: end;
`;

// 푸터쪽 영역 간격
const ReviewWrapper = styled(Section)`
  margin-bottom: 140px;
`;

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <ReviewWrapper>
      <SectionTitle>상품 후기</SectionTitle>
      <ReviewCardArea>
        {reviews.map((item) => (
          <ReviewCard
            key={item.id}
            onClick={() => navigate(`/reviews?productId=${item.productId}`)}
            style={{ cursor: "pointer" }}
          >
            <ReviewHeader>
              <RatingStars>★★★★★</RatingStars>
              {item.isBest && <ReviewBadge>BEST</ReviewBadge>}
            </ReviewHeader>
            <ReviewProductName>{item.productName}</ReviewProductName>
            <ReviewContent>{item.content}</ReviewContent>
            <ReviewImage src={item.imageUrl} />
            <ReviewCardId>{item.userId}</ReviewCardId>
            <ReviewCardDate>{item.date}</ReviewCardDate>
          </ReviewCard>
        ))}
      </ReviewCardArea>
    </ReviewWrapper>
  );
}
