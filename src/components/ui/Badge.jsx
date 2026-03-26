import styled from "@emotion/styled";

/* 기본 작은 배지 */
const getSmallBadge = (theme) => ({
  color: theme.colors.white,
  height: 18,
  padding: "0 10px",
  radius: theme.radius.sm,
  fontSize: theme.fontSize.xs,
  fontWeight: theme.fontWeight.regular,
});

/* 기본 중간 배지 */
const getMediumBadge = (theme) => ({
  color: theme.colors.white,
  height: 26,
  padding: "0 14px",
  radius: theme.radius.sm,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.regular,
});

/* 배지 종류별 스타일 */
const getBadgeMap = (theme) => {
  const smallBadge = getSmallBadge(theme);
  const mediumBadge = getMediumBadge(theme);

  return {
    free: {
      ...smallBadge,
      background: theme.badge.free,
      label: "무료배송",
    },
    best: {
      ...smallBadge,
      background: theme.badge.best,
      label: "BEST",
    },
    sale: {
      ...smallBadge,
      background: theme.badge.sale,
      label: "SALE",
    },
    new: {
      ...smallBadge,
      background: theme.badge.new,
      label: "NEW",
    },
    coupon: {
      ...smallBadge,
      background: theme.badge.coupon,
      label: "쿠폰",
    },
    percent: {
      color: theme.colors.white,
      background: theme.badge.percent,
      height: 20,
      padding: "0 14px",
      radius: theme.radius.pill,
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.bold,
      label: "% 할인",
    },
    shipping: {
      ...mediumBadge,
      background: theme.badge.shipping,
      label: "배송중",
    },
    done: {
      ...mediumBadge,
      background: theme.badge.done,
      label: "배송완료",
    },
  };
};

export default function Badge({ variant = "free", children, className }) {
  return (
    <StyledBadge className={className} $variant={variant}>
      {children}
    </StyledBadge>
  );
}

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  white-space: nowrap;
  line-height: 1;

  ${({ theme, $variant }) => {
    const badgeMap = getBadgeMap(theme);
    const current = badgeMap[$variant] || badgeMap.free;

    return `
      height: ${current.height}px;
      padding: ${current.padding};
      border-radius: ${current.radius};
      font-size: ${current.fontSize};
      font-weight: ${current.fontWeight};
      background-color: ${current.background};
      color: ${current.color};
    `;
  }}
`;

/*
사용법

<Badge variant="free">무료배송</Badge>
<Badge variant="best">BEST</Badge>

설명
- 공용 배지 UI 컴포넌트
- variant 값에 따라 배경색, 크기, 스타일이 달라짐
- 배지 안에 들어갈 텍스트는 children으로 직접 전달해서 사용

사용 가능한 variant
- free / best / sale / new / coupon / percent / shipping / done
*/
