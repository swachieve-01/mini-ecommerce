import React from "react";
import styled from "@emotion/styled";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Props로 모든 스타일을 조절 */
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  margin-left: ${({ marginLeft }) => marginLeft || "0px"};

  /* 테마(theme) 활용 */
  background-color: ${({ theme, bgColor, variant }) =>
    variant === "outline"
      ? "transparent"
      : theme.colors[bgColor] || theme.colors.primary};

  border: ${({ theme, variant }) =>
    variant === "outline" ? `1px solid ${theme.colors.borderFocus}` : "none"};

  border-radius: ${({ theme, radius }) => theme.radius[radius] || "0px"};

  /* 내부 텍스트 스타일 */
  span {
    color: ${({ theme, textColor }) =>
      theme.colors[textColor] || theme.colors.white};
    font-size: ${({ theme, fontSize }) =>
      theme.fontSize[fontSize] || theme.fontSize.md};
    font-weight: ${({ theme, fontWeight }) =>
      theme.fontWeight[fontWeight] || theme.fontWeight.regular};
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export function Button({ children, type = "button", onClick, ...styleProps }) {
  return (
    <StyledButton type={type} onClick={onClick} {...styleProps}>
      <span>{children}</span>
    </StyledButton>
  );
}
