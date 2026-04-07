import { Routes, Route } from "react-router-dom";

// layout
import DefaultLayout from "../components/layout/DefaultLayout";

// public pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ReviewPage from "../pages/ReviewPage";
import SteamListPage from "../pages/SteamListPage";

// protected pages
import CartPage from "../pages/CartPage";

// etc
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* 기본 레이아웃 사용하는 페이지 */}
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* 수정 */}
        <Route path="/category/:category/*" element={<ProductListPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        {/* 찜리스트 */}
        <Route path="/Steamlist" element={<SteamListPage />} />
      </Route>

      {/* 로그인 필요한 페이지 */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DefaultLayout />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
