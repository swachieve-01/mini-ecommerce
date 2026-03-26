import { useAuthStore } from "../store/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/**
 * 전역 fetch 래퍼 함수 (apiClient)
 */
export default async function apiClient(endpoint, options = {}) {
  const { token, logout } = useAuthStore.getState();

  // 1. 헤더 설정 (토큰 자동 주입)
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    // 2. 응답 가로채기 (인터셉터 역할)
    if (response.status === 401) {
      logout();
      throw new Error("UNAUTHORIZED");
    }

    // 3. 404 등 기타 에러 처리
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.message || errorData?.error || "요청 처리 중 오류 발생",
      );
    }

    // 4. JSON 변환 자동화 (axios의 res.data 역할)
    if (response.status === 204) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("요청 시간 초과");
      throw new Error("TIMEOUT");
    }

    console.error("API 요청 실패:", error);
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
