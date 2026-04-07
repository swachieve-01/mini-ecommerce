import styled from "@emotion/styled";

// pops 활용 (테마 타입 가져와서 쓰기)
// 뱃지 스타일
const StyledBadge = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, type }) => theme?.badge?.[type] || "#f5f5f5"};

  color: ${({ theme, type }) => theme?.badgeText?.[type] || "#333"};
`;

// 뱃지 스타일 적용
const getBadgeType = (text) => {
  if (text.includes("세일")) return "sale";
  if (text.includes("무료")) return "free";
  if (text.includes("BEST")) return "best";
  if (text.includes("NEW")) return "new";
  if (text.includes("쿠폰")) return "coupon";
  return null;
};

export default function BadgeStyle({ text }) {
  const type = getBadgeType(text) || "default";

  return <StyledBadge type={type}>{text}</StyledBadge>;
}
