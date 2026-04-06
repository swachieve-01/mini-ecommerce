import styled from "@emotion/styled";
import {
  SortDropdownItem,
  SortDropdownList,
  SortDropdownSelected,
  SortDropdownWrapper,
} from "../ui/SortButton";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryList } from "../../data/categories";

// 전체 헤더 컨테이너
const CategoryHeaderBox = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 60px;
  margin-top: 80px;
  text-align: left;
  position: relative;

  /* 하단 라인 */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -30px;
    width: 100%;
    height: 4px;
    background-color: #8fa77e;
  }
`;

// 카테고리 타이틀 (ex. 스킨케어)
const CategoryTitle = styled.h1`
  font-size: 46px;
  font-weight: 400;
  color: #4f6a4e;
  margin: 0 auto;
`;

// 카테고리 설명
const CategoryDesc = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 auto;
  padding: 20px;
`;

// 카테고리 버튼 묶음
const CategoryButtonBox = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 790px) {
    display: none;
  }
`;

// 개별 카테고리 버튼
const CategoryButton = styled.button`
  padding: 10px 20px;

  /* 현재 선택된 카테고리면 색 변경 */
  background-color: ${({ active }) => (active ? "#8FA77E" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #8fa77e;
    background: #f8faf7;
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 790px) {
    display: none;
  }
`;

// 타이틀 + 설명 묶음
const CategoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 40px;
`;

// 버튼 + 정렬 드롭다운 영역
const CategoryDropdown = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    align-items: flex-end;
    gap: 10px;
  }
`;

// 드롭다운 기준점
const MobileFilterWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

// 드롭다운 화살표 추가
const DropdownArrowIcon = styled.span`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;

  svg {
    width: 14px;
    height: 14px;
    transition: transform 0.25s ease;
    transform: rotate(${({ open }) => (open ? "180deg" : "0deg")});
  }
`;

const MobileFilterBox = styled.div`
  display: none;

  @media (max-width: 790px) {
    display: flex;
    align-items: center;
  }
`;

const FilterButton = styled.button`
  border-radius: 20px;
  padding: 8px 12px;
  background: #fff;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #ddd;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 790px) {
    height: 44px;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    background: #fff;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 6px;

    font-size: 13px;
    color: #333;

    transition: all 0.15s ease;

    &:hover {
      border-color: #8fa77e;
      background: #f8faf7;
    }

    &:active {
      transform: scale(0.97);
    }

    ${({ open }) =>
      open &&
      `
    border-color: #8FA77E;
    background: #f3f7f3;
  `}
  }
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: 38px;
  left: 0;
  width: 100%;
  font-size: 12px;
  white-space: nowrap;

  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 10px;
  z-index: 999;
`;

const FilterItem = styled.div`
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;

  background: ${({ active }) => (active ? "#f3f7f3" : "#fff")};
  color: ${({ active }) => (active ? "#4f6a4e" : "#000")};
  font-weight: ${({ active }) => (active ? "600" : "400")};

  &:hover {
    background: #f3f7f3;
  }
`;

// 왼쪾영역
const LeftInfo = styled.div`
  font-size: 14px;
  color: #666;

  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

// 오른쪽 영역
const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (min-width: 769px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

// pc버전 버튼 묶음
const ControlRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default function CategoryHeader({
  categories = [], // API로 받아온 카테고리 목록
  category, // 현재 선택된 카테고리 (URL 기반)
  sort, // 현재 정렬 상태
  setSort, // 정렬 변경 함수
  open, // 드롭다운 열림 상태
  setOpen, // 드롭다운 토글 함수
  sortOptions, // 정렬 옵션 리스트
  totalCount, // 총 상품 갯수
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const filterRef = useRef(null);

  // 현재 선택된 정렬 옵션 찾기
  const current = sortOptions.find((opt) => opt.key === sort);

  // 현재 카테고리 정보 (타이틀 + 설명)
  const categoryInfo =
    categoryList.find((item) => item.key.toLowerCase() === category) ||
    categoryList[0];

  // 필터 오른쪽 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 카테고리 필터 왼쪽 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ESC 키 눌렀을 때 드롭다운 닫기
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // ESC 키 (왼쪽)
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setFilterOpen(false);
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <CategoryHeaderBox>
      <CategoryInfo>
        <CategoryTitle>{categoryInfo.title}</CategoryTitle>
        <CategoryDesc>{categoryInfo.desc}</CategoryDesc>
      </CategoryInfo>

      <CategoryDropdown>
        {/*  상품 개수만 */}
        <LeftInfo>총 {totalCount || 0}개</LeftInfo>

        {/* 모바일 오른쪽: 필터 + 카테고리 + 정렬 */}
        <RightControls>
          {/* 필터영역 */}
          <MobileFilterBox>
            <MobileFilterWrapper ref={filterRef}>
              <FilterButton onClick={() => setFilterOpen((prev) => !prev)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7H14M14 7L17 4M14 7L17 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 17H10M10 17L7 14M10 17L7 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                필터
              </FilterButton>

              {filterOpen && (
                <FilterDropdown>
                  {[
                    { key: "all", name: "전체" },
                    { key: "skin", name: "스킨케어" },
                    { key: "makeup", name: "메이크업" },
                    { key: "cleanser", name: "클렌저" },
                    { key: "hairbody", name: "바디케어" },
                    { key: "perfume", name: "향수" },
                    { key: "beautytool", name: "뷰티툴" },
                  ].map((item) => (
                    <FilterItem
                      key={item.key}
                      active={category === item.key}
                      onClick={() => {
                        navigate(`/category/${item.key}`);
                        setFilterOpen(false);
                      }}
                    >
                      {item.name}
                    </FilterItem>
                  ))}
                </FilterDropdown>
              )}
            </MobileFilterWrapper>
          </MobileFilterBox>

          {/* PC 카테고리 버튼 */}
          <ControlRow>
            <CategoryButtonBox>
              {[{ categoryId: "all", name: "전체" }, ...categories].map(
                (item) => (
                  <CategoryButton
                    key={item.categoryId}
                    onClick={() =>
                      navigate(`/category/${item.categoryId.toLowerCase()}`)
                    }
                    active={category === item.categoryId.toLowerCase()}
                  >
                    {item.name}
                  </CategoryButton>
                ),
              )}
            </CategoryButtonBox>

            {/* 정렬 드롭다운 */}
            <SortDropdownWrapper ref={dropdownRef}>
              <SortDropdownSelected onClick={() => setOpen((prev) => !prev)}>
                {current?.label}

                <DropdownArrowIcon open={open}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </DropdownArrowIcon>
              </SortDropdownSelected>

              {open && (
                <SortDropdownList>
                  {sortOptions.map((opt) => (
                    <SortDropdownItem
                      key={opt.key}
                      onClick={() => {
                        setSort(opt.key);
                        setOpen(false);
                      }}
                      style={{
                        background: sort === opt.key ? "#8FA77E" : "#fff",
                        color: sort === opt.key ? "#fff" : "#000",
                      }}
                    >
                      {opt.label}
                    </SortDropdownItem>
                  ))}
                </SortDropdownList>
              )}
            </SortDropdownWrapper>
          </ControlRow>
        </RightControls>
      </CategoryDropdown>
    </CategoryHeaderBox>
  );
}
