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
