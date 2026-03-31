import { useEffect, useState } from "react";
import { heroBannerMeta } from "../data/banners";
import { getMainBanner } from "../api/Banner";
import { BannerImage, BannerWrapper } from "../styles/BannerStyle";
import styled from "@emotion/styled";

// 이미지 위 텍스트 박스
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
    width: 90%;
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

  @media (max-width: 1024px) {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// 배너 버튼
const BannerButton = styled.button`
  color: ${({ isWhite }) => (isWhite ? "#4f6a4e" : "white")};
  background: ${({ isWhite }) => (isWhite ? "white" : "#8FA77E")};
  font-size: clamp(12px, 1.5vw, 20px);
  border-radius: 50px;
  /* border: 2px solid #4f6a4e; */
  margin-top: 45px;
  padding: clamp(8px, 1vw, 15px) clamp(20px, 3vw, 60px);
  transition: all 0.3s ease;

  cursor: pointer;
`;

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState([]);

  // 데이터 가져오고
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMainBanner();
        setBanners(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  // 초기화
  useEffect(() => {
    if (banners.length > 0) {
      setIndex(0);
    }
  }, [banners]);

  // 슬라이드 부분
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  const banner = banners[index];
  const meta = heroBannerMeta[index + 1] || {};

  // 방어코드
  if (!banner) return null;

  return (
    <BannerWrapper height="clamp(300px, 50vw, 600px)">
      <BannerImage src={banner.src} />

      <TextBox position={meta.position} align={meta.align}>
        <Title isWhiteText={meta.isWhiteText}>{meta.title}</Title>
        <SubText isWhiteText={meta.isWhiteText}>{meta.sub}</SubText>

        {meta.hasButton && (
          <BannerButton isWhite={meta.isWhiteButton}>
            지금 보러가기
          </BannerButton>
        )}
      </TextBox>
    </BannerWrapper>
  );
}
