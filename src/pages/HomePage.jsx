import React from "react";
import HeroBannerSection from "../sections/HeroBannerSection";
import BestSection from "../sections/BestSection";
import CategorySection from "../sections/CategorySection";
import NewSection from "../sections/NewSection";
import HotdealSection from "../sections/HotdealSection";
import EventSection from "../sections/EventSection";
import RecommendSection from "../sections/RecommendSection";
import ReviewSection from "../sections/ReviewSection";
import styled from "@emotion/styled";

const HomeBanner = styled.main`
  margin: 0;
`;

export default function HomePage() {
  return (
    <>
      <HomeBanner>
        <HeroBannerSection />
      </HomeBanner>
      <BestSection />
      <CategorySection />
      <NewSection />
      <HotdealSection />
      <EventSection />
      <RecommendSection />
      <ReviewSection />
    </>
  );
}
