import styled from "@emotion/styled";
import theme from "./theme";

// 섹션 간격
export const Section = styled.section`
  margin-top: ${theme.spacing.section};
`;

// 섹션 타이틀 간격
export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: ${theme.spacing.titleBlock};
  /* background: red; */
`;

// 메인 양여백
export const MainLayout = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
`;

// 핫딜 상품 이미지
export const HotDeal = styled.img`
  width: 100%;
  max-width: 600px;
  height: 600px;
`;

// 핫딜 상품 정렬
export const HotArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 600px);
  justify-content: center;
  gap: 50px;
`;
