import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Section, SectionTitle } from "../styles/SectionStyle";
import { getEventBanner } from "../api/Banner";
import { eventBannerMeta } from "../components/Banner/HeroBannerText";

// 이벤트 영역
const EvenWrapper = styled.div`
  position: relative;
  /* width: 100%; */
  height: ${(props) => props.height};
`;

// 이벤트 이미지
const EventItem = styled.img`
  width: 100%;
  max-width: 707px;
  height: 100%;
  object-fit: cover;
`;

// 이벤트 정렬
const EventBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
`;

//  텍스트 영역
const TextBox = styled.div`
  position: absolute;

  top: ${({ position }) => position?.top || "50%"};
  left: ${({ position }) => position?.left};
  right: ${({ position }) => position?.right};

  transform: translateY(-50%);
  text-align: ${({ align }) => align || "center"};

  z-index: 2;
`;

// 배너 문구
const EventTitle = styled.h3`
  font-size: 28px;
  margin-bottom: 10px;
  white-space: pre-line;
  color: ${({ isWhiteText }) => (isWhiteText ? "#675A54" : "#F36A1D")};
`;

const SubText = styled.p`
  font-size: 16px;
  white-space: pre-line;
  color: ${({ isWhiteText }) => (isWhiteText ? "#675A54" : "#F36A1D")};
`;

export default function EventSection() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEventBanner();
        setBanners(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  // 방어코드
  if (banners.length === 0) return null;

  return (
    <Section>
      <SectionTitle>이달의 이벤트</SectionTitle>

      <EventBox>
        {banners.map((item, index) => {
          const meta = eventBannerMeta[index + 1] || {};

          return (
            <EvenWrapper key={item.id} height="300px">
              <EventItem src={item.imageUrl} />

              <TextBox position={meta.position} align={meta.align}>
                <EventTitle isWhiteText={meta.isWhiteText}>
                  {meta.title}
                </EventTitle>
                <SubText isWhiteText={meta.isWhiteText}>{meta.sub}</SubText>
              </TextBox>
            </EvenWrapper>
          );
        })}
      </EventBox>
    </Section>
  );
}
