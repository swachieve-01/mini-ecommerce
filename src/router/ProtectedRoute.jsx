import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute({ allowedRoles }) {
  // Zusstand 스토어에서 상태와 유저 정보 가져오기
  const { isAuthenticated, userInfo, hasHydrated } = useAuthStore();
  const location = useLocation();

  // 1. hydration 완료 전 대기
  if (!hasHydrated) {
    return <div>로딩중...</div>; // 또는 스피너
  }

  // 2. 로그인 여부 체크
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          message: "로그인이 필요합니다.",
          from: location.pathname,
        }}
      />
    );
  }

  // 3. 권한 (Role) 체크  (필요한 경우만)
  // 예: allowedRoles가 ['admin']인데 유저 역할이 'user'라면 차단
  if (allowedRoles?.length > 0) {
    if (!userInfo || !allowedRoles.includes(userInfo.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}
