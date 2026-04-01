import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { useCategoryStore } from "../../stores/CategoryStore";
import { useEffect } from "react";
import useAuthStore from "../../stores/useAuthStore";

const MobileCategoryMenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 260px;
  height: 100vh;

  background: #fff;
  padding: 24px;
  z-index: 2000;

  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  transition: transform 0.3s ease;
  box-shadow: 4px 0 35px rgba(0, 0, 0, 0.3);
`;

const MobileCategoryOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1999;

  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: 0.3s;
`;

const MobileCategoryCloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 20px;

  font-size: 20px;
  border: none;
  background: none;
  cursor: pointer;
`;

const MobileCategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
  padding-bottom: 20px;

  li {
    font-size: 15px;
    padding: 6px 0;
    transition: all 0.2s ease;
    padding: 5px 24px;
    margin: 0 -24px;
    cursor: pointer;
  }

  a {
    display: block;
    padding: 5px 24px;
    margin: 0 -24px;
    font-size: 15px;
    color: #222;
    text-decoration: none;

    transition: all 0.2s ease;
  }

  a:active {
    background: #f5f5f5;
  }
`;

const MobileCategoryDivider = styled.div`
  height: 6px;
  background: #e9e9e9;
  margin: 20px -24px;
`;

const SectionTitle = styled.div`
  font-size: 13px;
  color: #999;
  margin-top: 24px;
`;

export default function MobileCategoryMenu({ open, onClose }) {
  // 모바일 카테고리 열리고 닫히면 하단바 존재 유/무
  const setOpen = useCategoryStore((state) => state.setOpen);
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    setOpen(open);
    return () => {
      setOpen(false);
    };
  }, [open]);

  return (
    <>
      <MobileCategoryOverlay open={open} onClick={onClose} />

      <MobileCategoryMenuWrapper open={open}>
        <MobileCategoryCloseButton onClick={onClose}>
          ✕
        </MobileCategoryCloseButton>

        <SectionTitle>카테고리</SectionTitle>

        <MobileCategoryList>
          <li>
            <NavLink to="/category/skin" onClick={onClose}>
              스킨케어
            </NavLink>
          </li>

          <li>
            <NavLink to="/category/cleanser" onClick={onClose}>
              클렌저
            </NavLink>
          </li>

          <li>
            <NavLink to="/category/hairbody" onClick={onClose}>
              헤어 · 바디
            </NavLink>
          </li>

          <li>
            <NavLink to="/category/perfume" onClick={onClose}>
              향수
            </NavLink>
          </li>

          <li>
            <NavLink to="/category/beautytool" onClick={onClose}>
              소품
            </NavLink>
          </li>
        </MobileCategoryList>

        <MobileCategoryDivider />

        <SectionTitle>내 정보</SectionTitle>
        <MobileCategoryList>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/orders" onClick={onClose}>
                  주문조회
                </NavLink>
              </li>

              <li
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                로그아웃
              </li>

              <li>
                <NavLink to="/cs" onClick={onClose}>
                  고객센터
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" onClick={onClose}>
                  로그인
                </NavLink>
              </li>

              <li>
                <NavLink to="/signup" onClick={onClose}>
                  회원가입
                </NavLink>
              </li>

              <li>
                <NavLink to="/orders" onClick={onClose}>
                  찜목록
                </NavLink>
              </li>

              <li>
                <NavLink to="/cs" onClick={onClose}>
                  고객센터
                </NavLink>
              </li>
            </>
          )}
        </MobileCategoryList>
      </MobileCategoryMenuWrapper>
    </>
  );
}
