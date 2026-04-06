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

  padding: 10px 5px;
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
      <BottomNavItem to="/category/skin">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </BottomNavItem>
      <BottomNavItem to="/steamlist">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
        </svg>
      </BottomNavItem>
      <BottomNavItem to="/">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 10v10h14V10" />
        </svg>
      </BottomNavItem>
      <BottomNavItem to="/reviews">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a4 4 0 01-4 4H7l-4 3V7a4 4 0 014-4h10a4 4 0 014 4z" />
        </svg>
      </BottomNavItem>
      <BottomNavItem to="/cart">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6" />
        </svg>
      </BottomNavItem>
    </BottomNavWrapper>
  );
}
