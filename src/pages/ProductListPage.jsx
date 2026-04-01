import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import CategoryHeader from "../components/product/CategoryHeader";
import ProductCardList from "../components/product/ProductCardList";
import { getCategories } from "../api/main";
import apiClient from "../api/apiClient";
import styled from "@emotion/styled";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0 80px;
`;

const PageButton = styled.button`
  min-width: 36px;
  height: 36px;
  padding: 0 10px;

  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;

  color: #333;
  font-size: 14px;

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

export default function ProductsListPage() {
  const { category: paramCategory } = useParams();

  // URL 기반 category
  const category = useMemo(() => {
    if (!paramCategory) return "all";

    const normalized = paramCategory.toLowerCase().trim();

    const categoryMap = {
      skincare: "skin",
      care: "hairbody",
    };

    return categoryMap[normalized] || normalized;
  }, [paramCategory]);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("default");
  const [open, setOpen] = useState(false);

  // 추가 (페이지 상태)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // 카테고리 목록 API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();

        setCategories(
          (data || []).map((item) => ({
            ...item,
            categoryId: String(item.categoryId).toLowerCase().trim(),
          })),
        );
      } catch (e) {
        console.error(e);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // 상품 API + 필터
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiClient("/api/team1/products");

        const list = res?.data?.content || res?.data || [];

        const normalizedList = list.map((item, index) => ({
          ...item,
          id: `${item.id}-${index}`,
          categoryId: String(item.categoryId ?? item.categoryid)
            .toLowerCase()
            .trim(),
        }));

        const finalList =
          category === "all"
            ? normalizedList
            : normalizedList.filter((item) => item.categoryId === category);

        setProducts(finalList);
      } catch (e) {
        console.error(e);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [category]);

  // 정렬
  const sortedData = useMemo(() => {
    let result = [...products];

    switch (sort) {
      case "best":
        return result.filter(
          (item) => !item.badge || item.badge.includes("BEST"),
        );
      case "sale":
        return result.filter(
          (item) => !item.badge || item.badge.includes("세일"),
        );
      case "free":
        return result.filter(
          (item) => !item.badge || item.badge.includes("무료배송"),
        );
      default:
        return result;
    }
  }, [products, sort]);

  // 추가 (페이지 수 계산)
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // 추가 (데이터 잘라서 보여주기)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  // 추가 (카테고리/정렬 바뀌면 페이지 초기화)
  useEffect(() => {
    setCurrentPage(1);
  }, [category, sort]);

  const sortOptions = [
    { key: "default", label: "기본" },
    { key: "best", label: "베스트순" },
    { key: "sale", label: "세일순" },
    { key: "free", label: "무료배송" },
  ];

  return (
    <>
      <CategoryHeader
        categories={categories}
        category={category}
        sort={sort}
        setSort={setSort}
        open={open}
        setOpen={setOpen}
        sortOptions={sortOptions}
      />

      {/* 여기만 변경 확인바람 */}
      <ProductCardList
        data={paginatedData}
        itemWidth="340px"
        align="flex-start"
        mb="40px"
      />

      {/* 페이지네이션 UI 부분*/}
      <PaginationWrapper>
        <PageButton
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          이전
        </PageButton>

        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            active={currentPage === i + 1}
          >
            {i + 1}
          </PageButton>
        ))}

        <PageButton
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          다음
        </PageButton>
      </PaginationWrapper>
    </>
  );
}
