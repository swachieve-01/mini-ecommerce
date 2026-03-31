import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import CategoryHeader from "../components/product/CategoryHeader";
import ProductCardList from "../components/product/ProductCardList";
import { getCategories } from "../api/main";
import apiClient from "../api/apiClient";

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

      <ProductCardList
        data={sortedData}
        itemWidth="340px"
        align="flex-start"
        mb="40px"
      />
    </>
  );
}
