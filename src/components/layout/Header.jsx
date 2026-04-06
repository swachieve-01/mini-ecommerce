import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCartCount } from "../../utils/cart";
import { categoryData } from "../../data/Header";
import styled from "@emotion/styled";
import MobileCategoryMenu from "../Mobile/MobileMenu";
import logo from "../../assets/images/logo2.svg";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const HeaderWrap = styled.header`
  position: fixed;
  width: 100%;
  background: ${({ theme }) => theme.colors.bg};
  font-family: "Inter", sans-serif;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const HeaderInner = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid #d9d9d9;
`;

const HeaderTop = styled.div`
  height: 84px;
  padding: 65px 56px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border-bottom: 1px solid #222; */
  @media (max-width: 768px) {
    padding: 35px 30px;
  }
`;

const HeaderLogo = styled(NavLink)`
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 8px;

  @media (max-width: 768px) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-55%, -40%);
    display: block;
    z-index: 2;
  }

  @media (max-width: 480px) {
    transform: translate(-50%, -45%);
  }
`;

const HeaderLogoImage = styled.img`
  height: 120px;
  transition: height 0.25s ease;
  object-fit: contain;

  @media (max-width: 1480px) {
    height: 90px;
  }

  @media (max-width: 1024px) {
    height: 60px;
  }
`;

const SearchBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  width: 40%;
  max-width: 520px;
  min-width: 200px;

  height: 36px;
  display: flex;
  align-items: center;

  padding: 0 12px;
  border: 2px solid #8fa77e;
  border-radius: 999px;
  box-sizing: border-box;
  overflow: hidden;

  transition: width 0.3s ease;

  &#desktop-search {
    @media (max-width: 768px) {
      display: none;
    }
  }

  input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
  }

  button {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSize.xl};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileTopSection = styled.div`
  display: none;
  padding: 12px 16px;
  background: #fff;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const CartIcon = styled.svg``;

const UserMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;

  margin-left: auto;
  z-index: 2;

  @media (max-width: 1080px) {
    gap: 16px;
  }

  @media (max-width: 768px) {
    gap: 12px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 6px;
    min-width: 40px;

    color: ${({ theme }) => theme.colors.primaryDark};
    font-size: ${({ theme }) => theme.fontSize.lg};
    white-space: nowrap;
  }

  a:not(.cart) {
    @media (max-width: 1600px) {
      display: none;
    }
  }

  .divider {
    @media (max-width: 1600px) {
      display: none;
    }
  }

  a.cart {
    display: flex;
  }

  span {
    pointer-events: none;
  }

  svg {
    width: 20px;
    height: 20px;

    @media (max-width: 768px) {
      width: 18px;
      height: 18px;
    }
  }
`;

const CartLink = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CartBadge = styled.span`
  position: absolute;
  top: -10px;
  right: -4px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #76a55d;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryArea = styled.div`
  position: relative;
`;

const HeaderMainNav = styled.nav`
  height: 48px;
  border-bottom: 0.5px solid #e2e2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid #e5e5e5;
  background: #fff;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MainCategory = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 28px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MainCategoryItem = styled.li`
  position: relative;
  display: flex;
  height: 48px;
  align-items: center;

  a {
    height: 48px;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray900};
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: 0 2px;
  }

  &.active a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }

  &.active::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const SubNavWrap = styled.div`
  height: 0;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bg};
  transition:
    height 0.25s ease,
    border-color 0.25s ease;

  &.open {
    height: 38px;
    /* border-bottom: 1px solid #222; */
  }
`;

const SubCategoryList = styled.ul`
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 34px;
  list-style: none;
  margin: 0;
  padding: 0;

  a {
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray900};
    white-space: nowrap;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  border: none;
  background: none;
  cursor: pointer;
  left: 16px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MenuIcon = () => (
  <svg width="24" height="24" fill="none">
    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const NavDivider = styled.span`
  color: #ccc;
  margin: 0 8px;
`;

export default function Header() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/products?keyword=${keyword}`);
  };

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 테스트용 (장바구니나 다른 버튼 누르면 활성화)
  // useEffect(() => {
  //   useAuthStore.getState().login({
  //     token: "test",
  //     userInfo: { name: "테스트" },
  //   });
  // }, []);

  return (
    <HeaderWrap>
      <HeaderInner>
        <HeaderTop>
          {/* 햄버거 버튼 (모바일) */}
          <MenuButton onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </MenuButton>

          {menuOpen && window.innerWidth <= 768 && (
            <MobileCategoryMenu
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
            />
          )}
          <HeaderLogo to="/">
            <HeaderLogoImage src={logo} alt="Nature Glow 로고" />
          </HeaderLogo>

          <SearchBox id="desktop-search">
            <form
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="button" aria-label="검색" onClick={handleSearch}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
            </form>
          </SearchBox>

          <UserMenu>
            <NavLink to="/steamlist">
              <span>찜리스트</span>
            </NavLink>

            <NavLink to="/orders">
              <span>Error</span>
            </NavLink>

            <NavLink to="/reviews">
              <span>구매후기</span>
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    navigate("/");
                  }}
                >
                  로그아웃
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/signup">
                  <span>회원가입</span>
                </NavLink>

                <NavLink to="/login">
                  <span>로그인</span>
                </NavLink>
              </>
            )}

            <NavDivider className="divider">|</NavDivider>
            <CartLink to="/cart" className="cart">
              <span>장바구니</span>
              {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
            </CartLink>
          </UserMenu>
        </HeaderTop>

        <CategoryArea onMouseLeave={() => setHoveredCategory(null)}>
          <HeaderMainNav>
            <MainCategory>
              {categoryData.map((category) => {
                const isHovered = hoveredCategory?.id === category.id;

                return (
                  <MainCategoryItem
                    key={category.id}
                    className={isHovered ? "active" : ""}
                    onMouseEnter={() => setHoveredCategory(category)}
                  >
                    <NavLink
                      to={category.path}
                      className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                      }
                    >
                      {category.name}
                    </NavLink>
                  </MainCategoryItem>
                );
              })}
            </MainCategory>
          </HeaderMainNav>
          {/* 모바일 검색창 */}
          <MobileTopSection>
            <SearchBox
              style={{
                position: "static",
                transform: "none",
                width: "100%",
              }}
            >
              <form
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="button" onClick={handleSearch}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
              </form>
            </SearchBox>
          </MobileTopSection>

          <SubNavWrap className={hoveredCategory ? "open" : ""}>
            {hoveredCategory && (
              <SubCategoryList>
                {hoveredCategory.subCategories.map((subCategory) => (
                  <li key={subCategory.path}>
                    <NavLink
                      to={subCategory.path}
                      className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                      }
                    >
                      {subCategory.name}
                    </NavLink>
                  </li>
                ))}
              </SubCategoryList>
            )}
          </SubNavWrap>
        </CategoryArea>
      </HeaderInner>
    </HeaderWrap>
  );
}
