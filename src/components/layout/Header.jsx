import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCartCount } from "../../utils/cart";
import "./Header.css";

const categoryData = [
  {
    id: 1,
    name: "스킨케어",
    path: "/category/skincare",
    subCategories: [
      { name: "토너", path: "/category/skincare/toner" },
      { name: "세럼", path: "/category/skincare/serum" },
      { name: "크림", path: "/category/skincare/cream" },
      { name: "마스크팩", path: "/category/skincare/maskpack" },
      { name: "선케어", path: "/category/skincare/suncare" },
    ],
  },
  {
    id: 2,
    name: "메이크업",
    path: "/category/makeup",
    subCategories: [
      { name: "쿠션", path: "/category/makeup/cushion" },
      { name: "파운데이션", path: "/category/makeup/foundation" },
      { name: "립", path: "/category/makeup/lip" },
      { name: "아이섀도우", path: "/category/makeup/eyeshadow" },
      { name: "치크", path: "/category/makeup/cheek" },
    ],
  },
  {
    id: 3,
    name: "클렌저",
    path: "/category/cleanser",
    subCategories: [
      { name: "오일", path: "/category/cleanser/oil" },
      { name: "밤", path: "/category/cleanser/balm" },
      { name: "워터", path: "/category/cleanser/water" },
      { name: "폼", path: "/category/cleanser/foam" },
    ],
  },
  {
    id: 4,
    name: "헤어·바디 케어",
    path: "/category/care",
    subCategories: [
      { name: "샴푸", path: "/category/care/shampoo" },
      { name: "트리트먼트", path: "/category/care/treatment" },
      { name: "헤어오일", path: "/category/care/hairoil" },
      { name: "두피케어", path: "/category/care/scalp" },
      { name: "바디워시", path: "/category/care/bodywash" },
      { name: "바디로션", path: "/category/care/bodylotion" },
      { name: "핸드크림", path: "/category/care/hand" },
    ],
  },
  {
    id: 5,
    name: "향수",
    path: "/category/perfume",
    subCategories: [{ name: "퍼퓸", path: "/category/perfume/oddperfume" }],
  },
  {
    id: 6,
    name: "뷰티툴",
    path: "/category/beautytool",
    subCategories: [
      { name: "퍼프", path: "/category/beautytool/puff" },
      { name: "브러쉬", path: "/category/beautytool/brush" },
      { name: "괄사", path: "/category/beautytool/massage" },
      { name: "파우치", path: "/category/beautytool/pouch" },
    ],
  },
];

export default function Header() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);

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

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-top">
          <NavLink to="/" className="logo">
            <img
              src="/assets/images/logo.svg"
              alt="Nature Glow 로고"
              className="logo-image"
            />
            <div className="logo-text">
              <h1>NatureGlow</h1>
              <p>NATURAL BEAUTY CARE</p>
            </div>
          </NavLink>

          <div className="search-box">
            <input type="text" />
            <button type="button" aria-label="검색">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </div>

          <nav className="user-menu">
            <NavLink to="/login">로그인</NavLink>
            <NavLink to="/signup">회원가입</NavLink>
            <NavLink to="/orders">주문조회</NavLink>
            <NavLink to="/reviews">구매후기</NavLink>

            <NavLink to="/cart" className="cart-link">
              장바구니
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
          </nav>
        </div>

        <div
          className="category-area"
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <nav className="main-nav">
            <ul className="main-category">
              {categoryData.map((category) => {
                const isHovered = hoveredCategory?.id === category.id;

                return (
                  <li
                    key={category.id}
                    className={`main-category-item ${isHovered ? "active" : ""}`}
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
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={`sub-nav-wrap ${hoveredCategory ? "open" : ""}`}>
            {hoveredCategory && (
              <ul className="sub-category-list">
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
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
