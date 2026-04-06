import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useWishStore } from "../stores/WishlisStore";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";
import Modal from "../components/ui/Modal";
import { Button } from "../components/ui/Button";

// =============================== 전체 =====================

const WishlistWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 20px 80px;
`;

// =============================== 상단 =====================

const WishlistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const WishlistTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
  }
`;

const WishlistTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #4f6a4e;

  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
  }
`;

const WishlistDesc = styled.p`
  font-size: 14px;
  color: #666;

  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
  }
`;

const WishlistSub = styled.p`
  font-size: 13px;
  color: #8aa08a;
`;

// =============================== 요약 카드 =====================

const WishlistSummaryCard = styled.div`
  width: 220px;
  padding: 20px;
  border-radius: 12px;
  background: #f6f8f6;
  border: 1px solid #e2e8e2;
  text-align: center;

  @media (max-width: 600px) {
    width: 420px;
    padding: 10px;
    font-size: 18px;
    font-weight: 600;
    color: #4f6a4e;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

const WishlistSummaryCount = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #4f6a4e;
  margin: 6px 0;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const WishlistSummaryButton = styled.button`
  width: 100%;
  padding: 10px 0;
  border-radius: 8px;
  border: 1px solid #4f6a4e;
  background: #fff;
  color: #4f6a4e;
  cursor: pointer;

  @media (max-width: 600px) {
    max-width: 150px;
    font-size: 15px;
    padding: 6px;
    margin-left: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// =============================== 액션바 =====================

const WishlistActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 18px;
  border: 1px solid #8fa77e;
  border-radius: 10px;
  margin-bottom: 30px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  font-size: 13px;
  color: #4f6a4e;

  border: none;
  background: none;
  cursor: pointer;

  padding: 4px 6px;
  border-radius: 6px;

  transition: all 0.2s ease;

  &:hover {
    background: #f3f7f3;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  .delete-icon {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 600px) {
    font-size: 12px;

    svg {
      width: 18px; // 유지
      height: 18px;
    }
  }
`;

const ActionLeft = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  gap: 14px;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const ActionRight = styled.div`
  display: flex;
  gap: 10px;
`;

// =============================== 카드 =====================

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 48px 20px;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const WishlistCard = styled.div`
  position: relative;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.04);

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px); // 살짝 떠오름
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 600px) {
    flex-direction: row;
    align-items: center;
    padding: 10px;
  }
`;

const WishlistCheckbox = styled.input`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 18px;
  height: 18px;
  appearance: none;
  border: 1.5px solid #dcdcdc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;

  &:checked {
    background: #8fa77e;
    border-color: #8fa77e;
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -70%) rotate(45deg);
  }
`;

const WishlistHeart = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: none;
  cursor: default;

  svg {
    width: 18px;
    height: 18px;

    fill: #eb3939c0;
    stroke: none;
  }

  svg path {
    stroke: none;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const WishlistImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;

  display: block;

  @media (max-width: 600px) {
    width: 100px;
    height: 100px;
    border-radius: 8px;
  }
`;

const WishlistName = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 4px 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 600px) {
    font-size: 16px;
    margin: 0;
  }
`;

const CardContent = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  @media (max-width: 600px) {
    padding: 0 12px;
    justify-content: center;
    height: 80px;
  }
`;

const WishlisTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 600px) {
    min-height: auto;
  }
`;

const WishlistButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 15px;

  @media (max-width: 600px) {
    margin-top: 8px;
    padding: 6px 10px;
    font-size: 12px;
  }
`;

// 장바구니 버튼
const CartButton = styled.button`
  flex: 1;
  height: 36px;

  border: 1px solid #8fa77e;
  background: #fff;
  color: #4f6a4e;
  font-size: 13px;
  border-radius: 8px;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f7f3;
  }
`;

// 카드 삭제버튼
const WishlistDeleteButton = styled.button`
  flex: 1;
  width: 100%;
  height: 36px;
  border: 1px solid #e2e8e2;
  background: #fff;
  color: #777;
  font-size: 13px;
  border-radius: 8px;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff5a5a;
    color: #ff5a5a;
    background: #fff5f5;
  }
`;

const ProductDesc = styled.p`
  font-size: 13px;
  color: #888;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ProductOption = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray500};
  margin-top: 2px;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`;

// =============================== 추가 =====================
// 상품 유도 문구
const WishlistNotice = styled.div`
  margin-top: 40px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #f3f7f3;
  border: 1px solid #e2e8e2;
  border-radius: 30px;
  font-size: 14px;
  color: #4f6a4e;

  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

const NoticeText = styled.span`
  color: #6b7f6a;

  strong {
    color: #4f6a4e;
    font-weight: 600;
  }
`;

const NoticeIcon = styled.div`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #e6efe6;
  border-radius: 50%;

  svg {
    width: 14px;
    height: 14px;
    stroke: #4f6a4e;
  }
`;

// 빈 상태 전체 박스
const EmptyBox = styled.div`
  width: 100%;
  padding: 60px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1px dashed #dcdcdc;
  border-radius: 12px;

  background: #fafafa;
  margin-top: 20px;
`;

// 빈 부분 아이콘
const EmptyIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eef3ee;
  border-radius: 50%;

  svg {
    width: 28px;
    height: 28px;
    fill: #8fa77e;
  }
`;

// 빈 상품 텍스트
const EmptyText = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;

  strong {
    display: block;
    margin-top: 4px;
    color: #4f6a4e;
    font-weight: 600;
  }
`;

// 빈부분 버튼
const EmptyButton = styled.button`
  margin-top: 10px;
  padding: 10px 18px;
  border-radius: 8px;
  border: none;

  background: #8fa77e;
  color: #fff;
  font-size: 13px;

  cursor: pointer;

  &:hover {
    background: #6f8e66;
  }
`;

// 드롭다운 버튼영역
const WishlistDropdown = styled.div`
  position: relative;
  width: 150px;
`;

const WishlistDropdownBtn = styled.button`
  width: 100%;
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dcdcdc;
  border-radius: 8px;

  background: #fff;
  font-size: 13px;
  color: #333;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    border-color: #8fa77e;
  }

  &.active {
    border-color: #8fa77e;
    background: #f6f8f6;
  }
`;

const WishlistArrow = styled.span`
  width: 6px;
  height: 6px;
  border: solid #666;
  border-width: 0 1.5px 1.5px 0;
  transform: rotate(45deg);
  transition: transform 0.2s ease;

  &.open {
    transform: rotate(-135deg);
  }
`;

const WishlistDropdownMenu = styled.ul`
  position: absolute;
  top: 36px;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #e2e8e2;
  border-radius: 10px;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 6px 0;
  z-index: 999;
`;

const WishlistDropdownItem = styled.li`
  padding: 10px 12px;
  font-size: 13px;
  cursor: pointer;

  transition: background 0.15s ease;

  &:hover {
    background: #f3f7f3;
  }

  &.selected {
    background: #e9f0e8;
    color: #4f6a4e;
    font-weight: 500;
  }
`;

// =========================== 이동 버튼 ================
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 60px 0 80px;
`;

const PageButton = styled.button`
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  color: #333;
  font-size: 14px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }

  ${({ active }) =>
    active &&
    `
    background: #8FA77E;
    color: white;
    border: none;
    font-weight: 600;
  `}
`;

const PageNumber = styled.button`
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 6px;
  border: none;
  background: #f3f7f3;
  cursor: pointer;

  &.active {
    background: #8fa77e;
    color: #fff;
  }
`;

// 모달 부분
const LoginModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9999;
`;

const LoginModalBox = styled.div`
  width: 420px;
  padding: 36px 28px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginModalTitle = styled.h3`
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
  color: #4f6a4e;
`;

const LoginModalText = styled.p`
  margin: 0 0 28px;
  font-size: 14px;
  color: #6f8a6a;
  text-align: center;
  line-height: 1.5;
`;

const LoginModalButtonRow = styled.div`
  display: flex;
  gap: 12px;
`;

const LoginCancelButton = styled.button`
  height: 44px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid #dcdcdc;
  background: #fff;
  color: #666;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const LoginConfirmButton = styled.button`
  height: 44px;
  padding: 0 22px;
  border-radius: 999px;
  border: none;
  background: #8fa77e;
  color: #fff;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #6f8e66;
  }
`;

/* ================== 페이지 ================== */

export default function WishlistPage() {
  const { wishList, removeWish, removeSelected } = useWishStore();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("최근 찜한 순");
  const [sort, setSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  const itemsPerPage = 15;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const options = ["최근 찜한 순", "오래된 순"];

  // 최신순
  const sortedList = [...wishList];

  if (sort === "latest") {
    sortedList.reverse();
  }
  const currentItems = sortedList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(wishList.length / itemsPerPage);

  const getOptionLabel = (categoryId) => {
    const id = String(categoryId).toLowerCase().trim();

    switch (id) {
      case "skin":
        return "보습/진정 케어";
      case "cleanser":
        return "저자극 클렌징";
      case "makeup":
        return "데일리 메이크업";
      case "hairbody":
        return "바디/헤어 케어";
      case "perfume":
        return "향기/프레그런스";
      case "beautytool":
        return "뷰티 디바이스";
      default:
        return "";
    }
  };

  const getDescription = (categoryId) => {
    const id = String(categoryId).toLowerCase().trim();

    switch (id) {
      case "skin":
        return "피부를 촉촉하게 유지해주는 스킨케어";
      case "cleanser":
        return "노폐물을 부드럽게 제거하는 클렌징";
      case "makeup":
        return "자연스럽고 생기있는 메이크업";
      case "hairbody":
        return "바디와 모발을 건강하게 케어";
      case "perfume":
        return "은은하게 지속되는 향기";
      case "beautytool":
        return "뷰티 케어를 도와주는 도구";
      default:
        return "";
    }
  };

  return (
    <WishlistWrapper>
      {/* 상단 */}
      <WishlistHeader>
        <WishlistTitleBox>
          <WishlistTitle>찜 리스트</WishlistTitle>
          <WishlistDesc>
            마음에 드는 상품을 찜해두고 한눈에 확인해보세요.
          </WishlistDesc>
          <WishlistSub>최대 100개까지 저장 가능</WishlistSub>
        </WishlistTitleBox>

        <WishlistSummaryCard>
          찜한 상품
          <WishlistSummaryCount>{wishList.length}개</WishlistSummaryCount>
          <WishlistSummaryButton onClick={() => navigate("/products")}>
            상품 보러가기
          </WishlistSummaryButton>
        </WishlistSummaryCard>
      </WishlistHeader>

      {/* 액션바 */}
      <WishlistActionBar>
        <ActionLeft>
          <ActionButton
            onClick={() => {
              if (checkedItems.length === wishList.length) {
                setCheckedItems([]); // 전체 해제
              } else {
                setCheckedItems(wishList.map((item) => item.id)); // 전체 선택
              }
            }}
          >
            전체 선택 {checkedItems.length}개 선택됨
          </ActionButton>

          <ActionButton
            onClick={() => {
              if (!isAuthenticated) {
                setShowLoginModal(true);
                return;
              }

              wishList.forEach((item) => {
                if (!item) return;

                addToCart({
                  id: item.id,
                  name: item.name,
                  price: item.discountPrice || item.price,
                  image: item.imageUrl || item.image || item.thumbnail || "",
                  quantity: 1,
                  categoryId: item.categoryId,
                  checked: true,
                });
              });

              alert("전체 상품이 장바구니에 담겼습니다.");
            }}
          >
            {/* 장바구니 */}
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6h15l-1.5 9h-12zM6 6L5 3H2M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                stroke="#4f6a4e"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            전체 장바구니 담기
          </ActionButton>

          <ActionButton
            onClick={() => {
              if (checkedItems.length === 0) {
                alert("선택된 상품이 없습니다.");
                return;
              }

              if (confirm("선택한 상품을 삭제하시겠습니까?")) {
                removeSelected(checkedItems);
                setCheckedItems([]);
              }
            }}
          >
            {/* 삭제 */}
            <svg className="delete-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 7h12M9 7V5h6v2M8 7l1 12h6l1-12"
                stroke="#999"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            선택 삭제
          </ActionButton>

          <ActionButton
            onClick={() => {
              if (!isAuthenticated) {
                setShowLoginModal(true);
                return;
              }
              if (checkedItems.length === 0) {
                alert("선택된 상품이 없습니다.");
                return;
              }

              checkedItems.forEach((id) => {
                const item = wishList.find((w) => w.id === id);

                if (!item) return;

                addToCart({
                  id: item.id,
                  name: item.name,
                  price: item.discountPrice || item.price,
                  image: item.imageUrl || item.image || item.thumbnail || "",
                  quantity: 1,
                  categoryId: item.categoryId,
                  checked: true,
                });
              });

              alert("선택한 상품이 장바구니에 담겼습니다.");
            }}
          >
            {/* 장바구니 */}
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6h15l-1.5 9h-12zM6 6L5 3H2M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                stroke="#4f6a4e"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            선택 담기
          </ActionButton>
        </ActionLeft>

        <ActionRight>
          <WishlistDropdown>
            <WishlistDropdownBtn
              onClick={() => setOpen(!open)}
              className={open ? "active" : ""}
            >
              {selected}
              <WishlistArrow className={open ? "open" : ""} />
            </WishlistDropdownBtn>

            {open && (
              <WishlistDropdownMenu>
                {options.map((opt) => (
                  <WishlistDropdownItem
                    key={opt}
                    className={selected === opt ? "selected" : ""}
                    onClick={() => {
                      setSelected(opt);
                      setOpen(false);

                      if (opt === "최근 찜한 순") {
                        setSort("latest");
                      } else {
                        setSort("oldest");
                      }
                    }}
                  >
                    {opt}
                  </WishlistDropdownItem>
                ))}
              </WishlistDropdownMenu>
            )}
          </WishlistDropdown>
        </ActionRight>
      </WishlistActionBar>

      {/* 카드 */}
      {currentItems.length === 0 ? (
        <EmptyBox>
          <EmptyIcon>
            <svg viewBox="0 0 24 24">
              <path d="M12 21s-6.5-4.35-9-8.5C1.5 8.5 3.5 5 7 5c2 0 3.5 1 5 2.5C13.5 6 15 5 17 5c3.5 0 5.5 3.5 4 7.5-2.5 4.15-9 8.5-9 8.5z" />
            </svg>
          </EmptyIcon>

          <EmptyText>
            찜한 상품이 없습니다
            <strong>상품을 둘러보고 찜해보세요!</strong>
          </EmptyText>

          <EmptyButton onClick={() => navigate("/products")}>
            상품 둘러보기
          </EmptyButton>
        </EmptyBox>
      ) : (
        <WishlistGrid>
          {currentItems.map((item) => (
            <WishlistCard key={item.id}>
              <WishlistCheckbox
                type="checkbox"
                checked={checkedItems.includes(item.id)}
                onChange={() => {
                  setCheckedItems((prev) =>
                    prev.includes(item.id)
                      ? prev.filter((id) => id !== item.id)
                      : [...prev, item.id],
                  );
                }}
              />
              <WishlistHeart>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-6.5-4.35-9-8.5C1.5 8.5 3.5 5 7 5c2 0 3.5 1 5 2.5C13.5 6 15 5 17 5c3.5 0 5.5 3.5 4 7.5-2.5 4.15-9 8.5-9 8.5z"
                    stroke="currentColor"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </WishlistHeart>

              {/* 수정사항 ( 옵션넣기 ) */}
              <WishlistImage
                src={item.imageUrl || item.image || item.thumbnail}
              />
              <CardContent>
                <WishlisTextBox>
                  <WishlistName>{item.name}</WishlistName>
                  <ProductDesc>{getDescription(item.categoryId)}</ProductDesc>
                  <ProductOption>
                    {getOptionLabel(item.categoryId)}
                  </ProductOption>
                </WishlisTextBox>
                <WishlistButtonRow>
                  <CartButton
                    onClick={() => {
                      if (!isAuthenticated) {
                        setShowLoginModal(true);
                        return;
                      }

                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.discountPrice || item.price,
                        image:
                          item.imageUrl || item.image || item.thumbnail || "",
                        quantity: 1,
                        checked: true,
                      });

                      alert("장바구니에 담겼습니다.");
                    }}
                  >
                    장바구니
                  </CartButton>
                  <WishlistDeleteButton onClick={() => removeWish(item.id)}>
                    삭제하기
                  </WishlistDeleteButton>
                </WishlistButtonRow>
              </CardContent>
            </WishlistCard>
          ))}
        </WishlistGrid>
      )}

      <Pagination>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          이전
        </PageButton>

        {Array.from({ length: totalPages }, (_, i) => (
          <PageNumber
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PageNumber>
        ))}

        <PageButton
          disabled={currentPage === totalPages}
          onClick={(e) => {
            e.currentTarget.blur();
            setCurrentPage(currentPage + 1);
          }}
        >
          다음
        </PageButton>
      </Pagination>

      {wishList.length > 0 && (
        <WishlistNotice>
          <NoticeIcon>
            <svg viewBox="0 0 24 24">
              <path
                d="M12 2a7 7 0 0 0-4 12c.6.6 1 1.4 1 2.2V17h6v-.8c0-.8.4-1.6 1-2.2A7 7 0 0 0 12 2z"
                fill="#FFD54F"
              />
              <rect x="9" y="17" width="6" height="2" rx="1" fill="#F4B400" />
              <rect x="10" y="19" width="4" height="2" rx="1" fill="#E09E00" />
            </svg>
          </NoticeIcon>

          <NoticeText>
            찜한 상품이 품절되기 전에 <strong>장바구니에 담아보세요!</strong>
          </NoticeText>
        </WishlistNotice>
      )}

      {/* 모달 */}
      {showLoginModal && (
        <LoginModalOverlay onClick={() => setShowLoginModal(false)}>
          <LoginModalBox onClick={(e) => e.stopPropagation()}>
            <LoginModalTitle>로그인이 필요합니다</LoginModalTitle>

            <LoginModalText>
              장바구니에 저장되었습니다. <br />
              장바구니를 이용하려면 로그인해주세요
            </LoginModalText>

            <LoginModalButtonRow>
              <LoginCancelButton onClick={() => setShowLoginModal(false)}>
                취소
              </LoginCancelButton>

              <LoginConfirmButton onClick={() => navigate("/login")}>
                로그인하러 가기
              </LoginConfirmButton>
            </LoginModalButtonRow>
          </LoginModalBox>
        </LoginModalOverlay>
      )}
    </WishlistWrapper>
  );
}
