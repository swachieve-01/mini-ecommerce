import styled from "@emotion/styled";
import {
  SortDropdownItem,
  SortDropdownList,
  SortDropdownSelected,
  SortDropdownWrapper,
} from "../ui/SortButton";
import { useEffect, useRef } from "react";
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
`;

export default function CategoryHeader({
  categories = [], // API로 받아온 카테고리 목록
  category, // 현재 선택된 카테고리 (URL 기반)
  sort, // 현재 정렬 상태
  setSort, // 정렬 변경 함수
  open, // 드롭다운 열림 상태
  setOpen, // 드롭다운 토글 함수
  sortOptions, // 정렬 옵션 리스트
}) {
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  // 현재 선택된 정렬 옵션 찾기
  const current = sortOptions.find((opt) => opt.key === sort);

  // 현재 카테고리 정보 (타이틀 + 설명)
  const categoryInfo =
    categoryList.find((item) => item.key.toLowerCase() === category) ||
    categoryList[0];

  // 드롭다운 외부 클릭 시 닫기
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

  // ESC 키 눌렀을 때 드롭다운 닫기
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
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
        {/* 카테고리 버튼 영역 */}
        <CategoryButtonBox>
          {[{ categoryId: "all", name: "전체" }, ...categories].map((item) => (
            <CategoryButton
              key={item.categoryId}
              onClick={() => {
                navigate(`/category/${item.categoryId.toLowerCase()}`);
              }}
              active={category === item.categoryId}
            >
              {item.name}
            </CategoryButton>
          ))}
        </CategoryButtonBox>

        <SortDropdownWrapper ref={dropdownRef}>
          <SortDropdownSelected onClick={() => setOpen((prev) => !prev)}>
            {current?.label}
          </SortDropdownSelected>

          {/* 드롭다운 열렸을 때 */}
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
      </CategoryDropdown>
    </CategoryHeaderBox>
  );
}
