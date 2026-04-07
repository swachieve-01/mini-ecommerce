import { useEffect, useState } from "react";
import { heroBannerMeta } from "../data/banners";
import { getMainBanner } from "../api/Banner";
import { BannerImage, BannerWrapper } from "../styles/BannerStyle";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useLoadingStore } from "../stores/useLoadingStore";

// 텍스트 박스
const TextBox = styled.div`
  position: absolute;
  top: ${({ position }) => position?.top || "50%"};
  left: ${({ position }) => position?.left};
  right: ${({ position }) => position?.right};
  transform: translateY(-50%);
  text-align: ${({ align }) => align || "center"};
  z-index: 2;

  @media (max-width: 768px) {
    width: 90%;
    left: 50%;
    right: auto;
    transform: translate(-50%, -50%);
    text-align: center;
  }
`;

// 문구
const Title = styled.h2`
  white-space: pre-line;
  margin-bottom: 25px;
  color: ${({ isWhiteText }) => (isWhiteText ? "white" : "#4f6a4e")};
  font-size: clamp(24px, 3.5vw, 60px);
  font-weight: 500;
  line-height: 1.3;
`;

const SubText = styled.p`
  font-size: clamp(14px, 2.5vw, 30px);
  white-space: pre-line;
  color: ${({ isWhiteText }) => (isWhiteText ? "white" : "#4f6a4e")};
`;

// 버튼
const BannerButton = styled.button`
  color: ${({ isWhite }) => (isWhite ? "#4f6a4e" : "white")};
  background: ${({ isWhite }) => (isWhite ? "white" : "#8FA77E")};
  font-size: clamp(12px, 1.5vw, 20px);
  border-radius: 50px;
  margin-top: 45px;
  padding: clamp(8px, 1vw, 15px) clamp(20px, 3vw, 60px);
  transition: all 0.3s ease;
  cursor: pointer;
`;

// 화살표
const BannerArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  width: clamp(28px, 4vw, 42px);
  height: clamp(28px, 4vw, 42px);

  border-radius: 50%;
  border: none;

  color: rgba(10, 10, 10, 0.87);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 3;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(68, 68, 68, 0.247);
    backdrop-filter: blur(4px);
  }

  svg {
    width: clamp(16px, 2.5vw, 24px);
    height: clamp(16px, 2.5vw, 24px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const BannerLeftArrow = styled(BannerArrowButton)`
  left: 20px;
`;

const BannerRightArrow = styled(BannerArrowButton)`
  right: 20px;
`;

// 인디케이터
const IndicatorWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 3;
`;

const BannerDot = styled.div`
  width: clamp(6px, 1vw, 10px);
  height: clamp(6px, 1vw, 10px);
  border-radius: 50%;

  background: ${({ active }) =>
    active ? "#0c0c0c5a" : "rgba(255,255,255,0.4)"};

  transition: all 0.3s ease;
  cursor: pointer;
`;

const HeroBannerWrapper = styled(BannerWrapper)`
  position: relative;
  overflow: hidden;

  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    inset: 0;

    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.15),
      transparent 20%,
      transparent 80%,
      rgba(0, 0, 0, 0.15)
    );

    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }

  &:active::after {
    opacity: 1;
  }
`;

const LeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M15 6L9 12L15 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M9 6L15 12L9 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HeroSection() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  const [isSwiping, setIsSwiping] = useState(false);

  // pc버전 밀어서
  const [isDragging, setIsDragging] = useState(false);

  // 모바일 버전 밀어서
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const navigate = useNavigate();

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();

        const data = await getMainBanner();
        setBanners(data);
      } catch (e) {
        console.error(e);
      } finally {
        stopLoading();
      }
    };
    fetchData();
  }, []);

  // 자동 슬라이드
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners]);

  // 이동 함수
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  if (banners.length === 0) return null;

  // 모바일버전
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (Math.abs(distance) > 10) {
      setIsSwiping(true);
    } else {
      setIsSwiping(false);
    }

    // 슬라이드 이동
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();

    setTimeout(() => setIsSwiping(false), 50);
  };

  // pc버전
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  const banner = banners[current];
  const meta = heroBannerMeta[current + 1] || {};

  return (
    <HeroBannerWrapper
      height="clamp(300px, 50vw, 600px)"
      // 모바일
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // pc
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={() => {
        if (isSwiping) return;
        if (!meta.hasButton) {
          navigate(`/products/${banner.productId}`);
        }
      }}
      style={{ cursor: !meta.hasButton ? "pointer" : "default" }}
    >
      <BannerImage src={banner.src} />

      <TextBox position={meta.position} align={meta.align}>
        <Title isWhiteText={meta.isWhiteText}>{meta.title}</Title>
        <SubText isWhiteText={meta.isWhiteText}>{meta.sub}</SubText>

        {meta.hasButton && (
          <BannerButton
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${banner.productId}`);
            }}
            isWhite={meta.isWhiteButton}
          >
            지금 보러가기
          </BannerButton>
        )}
      </TextBox>

      {/* 화살표 */}
      <BannerLeftArrow
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
      >
        <LeftIcon />
      </BannerLeftArrow>

      <BannerRightArrow
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
      >
        <RightIcon />
      </BannerRightArrow>

      {/* 인디케이터 */}
      <IndicatorWrapper>
        {banners.map((_, idx) => (
          <BannerDot
            key={idx}
            active={idx === current}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </IndicatorWrapper>
    </HeroBannerWrapper>
  );
}
