import { useEffect, useState } from "react";
import { heroBannerMeta } from "../components/Banner/HeroBannerText";
import { getMainBanner } from "../api/Banner";
import { BannerImage, BannerWrapper } from "../styles/BannerStyle";
import styled from "@emotion/styled";

// 이미지 위 텍스트 박스
const TextBox = styled.div`
  position: absolute;

  top: ${({ position }) => position?.top || "50%"};
  left: ${({ position }) => position?.left};
  right: ${({ position }) => position?.right};

  transform: ${({ position }) =>
    position?.left === "50%" ? "translate(-50%, -50%)" : "translateY(-50%)"};

  text-align: ${({ align }) => align || "center"};

  z-index: 2;
`;

// 문구
const Title = styled.h2`
  font-size: 65px;
  font-weight: 500;
  margin-bottom: 25px;
  white-space: pre-line;
  color: ${({ isWhiteText }) => (isWhiteText ? "white" : "#4f6a4e")};
`;

const SubText = styled.p`
  font-size: 30px;
  white-space: pre-line;
  color: ${({ isWhiteText }) => (isWhiteText ? "white" : "#4f6a4e")};
`;

// 배너 버튼
const BannerButton = styled.button`
  color: ${({ isWhite }) => (isWhite ? "#4f6a4e" : "white")};
  background: ${({ isWhite }) => (isWhite ? "white" : "#8FA77E")};
  font-size: 20px;
  border-radius: 50px;
  /* border: 2px solid #4f6a4e; */
  margin-top: 45px;
  padding: 15px 60px;

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
    <BannerWrapper height="600px">
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
