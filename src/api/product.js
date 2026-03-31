import apiClient from "./apiClient";

const isDev = import.meta.env.VITE_IS_DEV === "true";

// 메인 섹션 데이터 조회
export async function getMainSection(section) {
  if (isDev) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      data: [],
    };
  }

  const res = await apiClient(`/main/${section}`);

  return {
    success: res.success,
    data: res.data,
  };
}

// 상품 목록 조회
export async function getProducts(category = "all", page = 1, limit = 10) {
  if (isDev) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      data: [],
      totalCount: 0,
      currentPage: page,
      totalPage: 0,
    };
  }

  const query = new URLSearchParams();

  if (category && category !== "all") {
    query.append("category", category);
  }

  query.append("page", page);
  query.append("limit", limit);

  const res = await apiClient(`/products?${query.toString()}`);

  return {
    success: res.success,
    data: res.data,
    totalCount: res.totalCount,
    currentPage: res.currentPage,
    totalPage: res.totalPage,
  };
}

// 상품 상세 조회
export async function getProductDetail(productId) {
  if (isDev) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      data: null,
    };
  }

  const res = await apiClient(`/products/${productId}`);

  return {
    success: res.success,
    data: res.data,
  };
}

// 상품 검색
export async function searchProducts(keyword) {
  if (isDev) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      data: [],
    };
  }

  const query = new URLSearchParams({
    keyword,
  });

  const res = await apiClient(`/search?${query.toString()}`);

  return {
    success: res.success,
    data: res.data,
  };
}

// 핫딜 상품 목록 조회
export async function getHotDeals() {
  if (isDev) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      data: [],
    };
  }

  const res = await apiClient("/api/team1/main/hotdeals");

  return {
    success: res.success,
    data: res.data,
  };
}

// 메인 카테고리
export async function getCategories() {
  if (isDev) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      { id: 1, name: "스킨케어", categoryId: "skin" },
      { id: 2, name: "메이크업", categoryId: "makeup" },
      { id: 3, name: "클렌저", categoryId: "cleanser" },
      { id: 4, name: "헤어/바디", categoryId: "hairbody" },
      { id: 5, name: "향수", categoryId: "perfume" },
      { id: 6, name: "소품", categoryId: "beautytool" },
    ];
  }

  const res = await apiClient("/api/team1/main/categories");
  const data = res.data?.data ?? res.data;

  return Array.isArray(data) ? data : [];
}
