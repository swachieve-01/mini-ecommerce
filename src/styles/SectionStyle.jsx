import styled from "@emotion/styled";
import theme from "./theme";

// 섹션 간격
export const Section = styled.section`
  margin-top: ${({ theme }) => theme.spacing.section};
`;

// 섹션 타이틀 간격
export const SectionTitle = styled.h2`
  text-align: center;
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.titleBlock};
  /* background: red; */
`;

// 메인 양여백
export const MainLayout = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 40px);
`;

// 핫딜 상품 이미지
export const HotDeal = styled.img`
  width: 100%;
  height: auto;
`;

// 핫딜 상품 정렬
export const HotArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  gap: 50px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
