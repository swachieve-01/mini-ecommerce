import React from "react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "../Mobile/BottomNav";
import Loading from "../ui/Loading";
import ScrollTop from "../../stores/ScrollTop";

export default function DefaultLayout() {
  return (
    <LayoutContainer>
      <ScrollTop />
      <Loading full />
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
      <BottomNav />
    </LayoutContainer>
  );
}

/* 일반 페이지 공통 레이아웃 */
const LayoutContainer = styled.div`
  width: 100%;
  max-width: 1920px;
  min-height: 100dvh;
  margin: 0 auto;
  border-inline: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bg};
`;

/* 페이지 본문 영역 */
const Main = styled.main`
  flex: 1;
  margin-top: 132px;
`;
