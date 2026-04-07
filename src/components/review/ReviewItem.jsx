import React, { useCallback, useState } from "react";

import { Button } from "../ui/Button";
import styled from "@emotion/styled";

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
  min-height: 250px;

  ${({ theme }) => theme.media.tablet} {
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

  ${({ theme }) => theme.media.smallMobile} {
    flex-direction: column;
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

const ContentText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

  &:hover .zoom-label {
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
`;

export default function ReviewItem({ review, onOpenModal }) {
  const [count, setCount] = useState(review?.helpCount || 0);

  if (!review) return null;
  const images = review.images || [];
  const imageCount = images.length;

  const handleOpenModal = (e) => {
    e?.stopPropagation();
    onOpenModal?.(review);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setCount((prev) => prev + 1);
  };

  return (
    <Card>
      <ImageSection onClick={handleOpenModal}>
        <MainImg src={images[0]} alt={review.title || review.productName} />
        <ZoomLabel>확대하기</ZoomLabel>
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

        <div>
          <ContentText>{review.content}</ContentText>
          <MoreButton onClick={handleOpenModal}>[더보기]</MoreButton>
        </div>

        <BottomSection>
          <SubImages>
            {images.slice(1, 5).map((img, idx) => (
              <SubImgWrapper key={`${img}-${idx}`} onClick={handleOpenModal}>
                <MainImg
                  src={img}
                  alt={`${review.productName} 리뷰 이미지 ${idx + 1}`}
                />

                {idx === 3 && imageCount > 5 && <div>+{imageCount - 5}</div>}

                <ZoomLabel>확대</ZoomLabel>
              </SubImgWrapper>
            ))}
          </SubImages>

          <InfoGroup>
            <div>작성일: {review.date}</div>
            <div>옵션: {review.option}</div>
          </InfoGroup>
        </BottomSection>
      </ContentSection>
    </Card>
  );
}
