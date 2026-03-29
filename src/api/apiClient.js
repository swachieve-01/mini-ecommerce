import { useAuthStore } from "../stores/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export default async function apiClient(endpoint, options = {}) {
  const { token, logout } = useAuthStore.getState();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    logout();
    throw new Error("로그인이 필요합니다.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "요청 중 오류가 발생했습니다.");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
