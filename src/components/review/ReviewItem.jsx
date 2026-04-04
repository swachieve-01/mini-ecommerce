import React, { useState } from "react";

import { Button } from "../ui/Button";
import styled from "@emotion/styled";

// --- Styled Components ---

const Card = styled.div`
  width: 100%;
  display: flex;
  gap: 24px;
  padding: 24px;
  margin-top: 15px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    gap: 16px;
  }
`;

const MainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter ${({ theme }) => theme.transition.normal};
`;

const ZoomLabel = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  visibility: hidden;
  transition: opacity ${({ theme }) => theme.transition.normal};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  white-space: nowrap;
  z-index: 10;
`;

const ImageSection = styled.div`
  width: 200px;
  height: 250px;
  aspect-ratio: 4 / 5;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};

  &:hover img {
    filter: brightness(${({ theme }) => theme.opacity.hover});
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }

  ${({ theme }) => theme.media.tablet} {
    /* 태블릿일 때 이미지가 너무 작아 보이면 가로폭을 살짝 키워 밸런스를 맞춤 */
    width: 180px;
    height: 220px;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    height: auto;
  }

  ${({ theme }) => theme.media.smallMobile} {
    max-height: 220px;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 250px;
  text-align: left;
  width: 100%;

  ${({ theme }) => theme.media.tablet} {
    /* 태블릿에서 이미지는 작고 글만 옆으로 너무 길어지는 것 방지 */
    max-width: 100%;
  }

  ${({ theme }) => theme.media.mobile} {
    min-height: auto;
    justify-content: flex-start;
    gap: 12px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  ${({ theme }) => theme.media.smallMobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const HelpfulButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 6px 12px;
  border-radius: 999px;

  font-size: 13px;
  font-weight: 500;

  color: ${({ theme }) => theme.colors.textSub};

  background: #f5f7f4;
  border: 1px solid #e3e8e1;

  cursor: pointer;
  transition: all 0.2s ease;

  span {
    font-size: 12px;
    opacity: 0.8;
  }

  svg {
    transition: all 0.2s ease;
  }

  &:hover {
    background: #eef2ec;
    transform: translateY(-1px);

    svg {
      stroke: #8fa77e;
      transform: scale(1.1);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

const HeartIcon = ({ active }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={active ? "#8FA77E" : "none"}
    stroke="#8FA77E"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21s-6.5-4.35-9-8.5C1.5 8.5 3.5 5 7 5c2 0 3.5 1 5 2.5C13.5 6 15 5 17 5c3.5 0 5.5 3.5 4 7.5C18.5 16.65 12 21 12 21z" />
  </svg>
);

const ProductName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textMain};
`;

const RatingRow = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.stars};
  font-size: ${({ theme }) => theme.fontSize.sm};
  display: flex;
  align-items: center;
`;

const UserId = styled.span`
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const ReviewTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textMain};
`;

const ContentContainer = styled.div`
  max-width: 650px;
  margin-bottom: 10px;
`;

const ContentText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.8em;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ theme }) => theme.fontSize.xs};
  cursor: pointer;
  padding: 0;
  margin-top: 4px;
  &:hover {
    text-decoration: underline;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-top: auto;
  gap: 20px;

  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    align-items: flex-end;
  }

  ${({ theme }) => theme.media.mobile} {
    margin-top: 10px;
    flex-direction: column;
    gap: 15px;
  }
`;

const SubImages = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
  flex-wrap: nowrap;

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    /* 모바일에서 서브 이미지들이 가로를 균등하게 점유 */
    & > div {
      flex: 1;
    }
  }
`;

const SubImgWrapper = styled.div`
  position: relative;
  flex: 1;
  width: 120px;
  aspect-ratio: 1.4 / 1;

  cursor: pointer;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.sm};
  flex-shrink: 0;

  &:hover img {
    filter: brightness(0.7);
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }

  ${({ theme }) => theme.media.mobile} {
    width: calc(33.33% - 7px);
    height: auto;
  }
`;

const InfoGroup = styled.div`
  text-align: right;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
  display: flex;
  flex-direction: column;
  padding-bottom: 2px;
  flex-shrink: 0;
`;

// --- Component Logic ---

export default function ReviewItem({ review, onOpenModal }) {
  if (!review) return null;

  const [count, setCount] = useState(review.helpCount || 0);

  const handleLike = (e) => {
    e.stopPropagation();
    setCount((prev) => prev + 1);
  };

  return (
    <Card>
      {/* 메인 이미지 클릭 시 확대 */}
      <ImageSection onClick={() => onOpenModal(review)}>
        <MainImg src={review.images?.[0]} alt="리뷰 메인" />
        <ZoomLabel>확대하기 →</ZoomLabel>
      </ImageSection>

      <ContentSection>
        <Header>
          <ProductName>{review.productName}</ProductName>

          <HelpfulButton onClick={handleLike}>
            <HeartIcon active={true} />
            <span>{count}</span>
          </HelpfulButton>
        </Header>
        <RatingRow>
          {"★".repeat(Number(review.rating) || 5)}
          <UserId>{review.userId}</UserId>
        </RatingRow>

        <ReviewTitle>{review.title}</ReviewTitle>
        <ContentContainer>
          <ContentText>{review.content}</ContentText>
          <MoreButton onClick={() => onOpenModal(review)}>[더보기]</MoreButton>
        </ContentContainer>

        <BottomSection>
          <SubImages>
            {review.images?.slice(1, 5).map((img, idx) => (
              <SubImgWrapper key={idx} onClick={() => onOpenModal(review)}>
                <MainImg src={img} alt={`서브-${idx}`} />
                {/* 5장 이상일 때 더보기 표시 로직 추가 기능 */}
                {idx === 3 && review.images.length > 5 && (
                  <div className="more-overlay">
                    +{review.images.length - 5}
                  </div>
                )}
                <ZoomLabel style={{ fontSize: "16px", padding: "4px 8px" }}>
                  확대하기
                </ZoomLabel>
              </SubImgWrapper>
            ))}
          </SubImages>

          <InfoGroup>
            <span>작성일: {review.date}</span>
            <span>옵션: {review.option}</span>
          </InfoGroup>
        </BottomSection>
      </ContentSection>
    </Card>
  );
}
