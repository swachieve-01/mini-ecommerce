import apiClient from "./apiClient";

const isDev = import.meta.env.VITE_IS_DEV === "true";

// 로그인
export default async function login(id, password) {
  // ✅ DEV 환경 (Mock)
  if (isDev) {
    await new Promise((r) => setTimeout(r, 500));

    if (id === "myadmin1" && password === "password123!") {
      return {
        success: true,
        token: "mock-token",
        userInfo: {
          loginId: id,
          name: "관리자",
          role: "admin",
        },
      };
    }

    return {
      success: false,
      message: "아이디 또는 비밀번호 오류",
    };
  }

  // ✅ 실제 API 호출
  const res = await apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({ id, password }),
  });

  // ✅ 응답 구조 통일
  return {
    success: true,
    token: res.token,
    userInfo: res.userInfo,
  };
}

// 회원가입
export async function signup(id, password) {
  // ✅ DEV 환경
  if (isDev) {
    await new Promise((r) => setTimeout(r, 500));

    return {
      success: true,
      userInfo: {
        loginId: id,
        name: "사용자",
        role: "user",
      },
    };
  }

  const res = await apiClient("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ id, password }),
  });

  return {
    success: true,
    userInfo: res.userInfo,
  };
}

// 내 정보 조회
export async function getMe() {
  // ✅ DEV 환경
  if (isDev) {
    return {
      success: true,
      userInfo: {
        loginId: "myadmin1",
        name: "관리자",
        role: "admin",
      },
    };
  }

  const res = await apiClient("/auth/me", {
    method: "GET",
  });

  return {
    success: true,
    userInfo: res.userInfo,
  };
}
