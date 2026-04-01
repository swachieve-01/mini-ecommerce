import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { useCategoryStore } from "../../stores/CategoryStore";

// 하단바 영역
const BottomNavWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 60px;

  background: #fff;
  border-top: 1px solid #eee;

  display: flex;
  justify-content: space-around;
  align-items: center;

  z-index: 1000;

  @media (min-width: 768px) {
    display: none;
  }
`;

// 하단바 텍스트영역
const BottomNavItem = styled(NavLink)`
  font-size: 12px;
  color: #777;
  text-decoration: none;

  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &.active {
    color: #8fa77e;
    font-weight: 500;
  }
`;

export default function BottomNav() {
  const isOpen = useCategoryStore((state) => state.isOpen);

  if (isOpen) return null;
  return (
    <BottomNavWrapper>
      <BottomNavItem to="/category/skin">카테고리</BottomNavItem>
      <BottomNavItem to="/wishlist">찜목록</BottomNavItem>
      <BottomNavItem to="/">홈</BottomNavItem>
      <BottomNavItem to="/reviews">후기</BottomNavItem>
      <BottomNavItem to="/cart">장바구니</BottomNavItem>
    </BottomNavWrapper>
  );
}
