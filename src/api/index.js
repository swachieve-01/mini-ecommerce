export { default as login } from "./auth";
export { signup, getMe } from "./auth";

// 상품 + 상세 등
export {
  getMainSection,
  getProducts,
  getProductDetail,
  searchProducts,
} from "./product";

// 메인 전용
export {
  getBestProducts,
  getHotdeals,
  getRecommend,
  getCategories,
  getReviews,
} from "./main";
