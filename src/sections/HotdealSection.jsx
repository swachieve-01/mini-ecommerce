import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Section, SectionTitle } from "../styles/SectionStyle";
import { getHotdeals } from "../api/main";

// 이미지 영역
const HotDealImage = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 600px;

  &:hover .overlay {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 이미지
const HotDealItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 이미지 정렬
const HotDealWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 600px);
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

// 이미지 오버레이
const HotDealOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;

  opacity: 0;
  transform: translateY(20px);
  transition: 0.3s;
`;

// 이미지 문구
const HotDealTitle = styled.p`
  color: #fff;
  font-size: 26px;
  margin-bottom: 10px;
`;

// 문구 정렬
const HotDealCenter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//  버튼
const HotDealButton = styled.button`
  width: fit-content;
  padding: 6px 14px;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  margin-left: auto;

  cursor: pointer;

  &:hover {
    background: #8fa77e;
    border: none;
  }
`;

// 상품명 없어서 대체 문구 사용
export default function HotdealSection() {
  const [hotdeals, setHotdeals] = useState([]);

  useEffect(() => {
    const fetchHotdeals = async () => {
      try {
        const data = await getHotdeals();
        setHotdeals(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotdeals();
  }, []);

  return (
    <Section>
      <SectionTitle>오늘의 핫딜</SectionTitle>

      <HotDealWrapper>
        {hotdeals.map((item) => (
          <HotDealImage key={item.id}>
            <HotDealItem src={item.imageUrl} alt="" />

            <HotDealOverlay className="overlay">
              <HotDealCenter>
                <HotDealTitle>{item.name || "Glow Your Moment"}</HotDealTitle>
              </HotDealCenter>

              <HotDealButton>보러가기 →</HotDealButton>
            </HotDealOverlay>
          </HotDealImage>
        ))}
      </HotDealWrapper>
    </Section>
  );
}
