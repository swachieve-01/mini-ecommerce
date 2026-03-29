import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Section, SectionTitle } from "../styles/SectionStyle";
import { getHotdeals } from "../api/main";

// 이미지 영역
const HotDealImage = styled.div`
  width: 100%;
  max-width: 600px;
  height: 600px;
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
`;

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
          </HotDealImage>
        ))}
      </HotDealWrapper>
    </Section>
  );
}
