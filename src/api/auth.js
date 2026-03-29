import apiClient from "./apiClient";

const isDev = import.meta.env.VITE_IS_DEV === "true";

// 로그인
export default async function login(id, password) {
  if (isDev) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (id === "myadmin1" && password === "password123!") {
      return {
        success: true,
        token: "mock-token",
        userInfo: {
          loginId: id,
          name: "관리자",
        },
      };
    }

    return {
      success: false,
      message: "아이디 또는 비밀번호 오류",
    };
  }

  const res = await apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({ id, password }),
  });

  return {
    success: res.success,
    token: res.token,
    userInfo: res.userInfo,
    message: res.message,
  };
}

// 회원가입
export async function signup({
  id,
  password,
  name,
  agreeTerms,
  agreePrivacy,
  agreeMarketing,
}) {
  if (isDev) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      userInfo: {
        loginId: id,
        name: name || "사용자",
      },
      message: "회원가입 성공",
    };
  }

  const res = await apiClient("/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      id,
      password,
      name,
      agreeTerms,
      agreePrivacy,
      agreeMarketing,
    }),
  });

  return {
    success: res.success,
    userInfo: res.userInfo,
    message: res.message,
  };
}

// 내 정보 조회
export async function getMe() {
  if (isDev) {
    return {
      success: true,
      userInfo: {
        loginId: "myadmin1",
        name: "관리자",
      },
    };
  }

  const res = await apiClient("/auth/me");

  return {
    success: res.success,
    userInfo: res.userInfo,
  };
}
