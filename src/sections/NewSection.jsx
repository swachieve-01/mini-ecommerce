import { useEffect, useState } from "react";
import { Section, SectionTitle } from "../styles/SectionStyle";
import { BannerImage, BannerWrapper } from "../styles/BannerStyle";
import { getNewBanner } from "../api/Banner";
import styled from "@emotion/styled";

// 신제품 영역
const NewTextBox = styled.div`
  text-align: right;
  position: absolute;
  top: 45%;
  right: 40%;
  transform: translateY(-50%);
  z-index: 2;
`;

// 신제품 문구
const NewTitle = styled.h2`
  color: white;
  font-size: 60px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
`;

const NewSubText = styled.p`
  color: white;
  font-size: 20px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
`;

export default function NewSection() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNewBanner();
        setBanner(data[0]);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  if (!banner) return null;

  return (
    <Section>
      <SectionTitle>신제품</SectionTitle>
      <BannerWrapper height="400px">
        <BannerImage src={banner.imageUrl} />
        <NewTextBox>
          <NewTitle>순하게 씻어내는 그린티 클렌징</NewTitle>
          <NewSubText>BHA 함유로 매끈한 피부결 케어 </NewSubText>
        </NewTextBox>
      </BannerWrapper>
    </Section>
  );
}
