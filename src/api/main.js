import apiClient from "./apiClient";

// 메인 베스트 상품
export const getBestProducts = async () => {
  const result = await apiClient("/api/team1/main/best");
  return result.data;
};

// 핫딜 상품
export const getHotdeals = async () => {
  const result = await apiClient("/api/team1/main/hotdeals");
  return result.data;
};

// MD 추천
export const getRecommend = async () => {
  const result = await apiClient("/api/team1/main/recommend");
  return result.data;
};

// 카테고리
export const getCategories = async () => {
  const result = await apiClient("/api/team1/main/categories");
  return result.data;
};

// 리뷰
export const getReviews = async () => {
  const result = await apiClient("/api/team1/main/reviews");
  return result.data;
};
