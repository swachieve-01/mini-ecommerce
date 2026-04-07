import apiClient from "./apiClient";

// 메인 히어로 배너
export const getMainBanner = async () => {
  const result = await apiClient("/api/team1/main/banner");
  return result.data;
};

// 신제품 배너
export const getNewBanner = async () => {
  const result = await apiClient("/api/team1/main/new");
  return result.data;
};

// 이벤트 배너
export const getEventBanner = async () => {
  const result = await apiClient("/api/team1/main/event");
  return result.data;
};
