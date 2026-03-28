import { Global, css, useTheme } from "@emotion/react";

const style = (theme) => css`
  /* reset */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 높이 기준 */
  html,
  body,
  #root {
    width: 100%;
    min-height: 100dvh;
  }

  /* body 기본 */
  body {
    font-family:
      "Pretendard",
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
    line-height: 1.5;
    background-color: ${theme.colors.bg};
    color: ${theme.colors.textMain};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 앱 전체 기준 */
  #root {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  /* 제목 기본 */
  h1,
  h2 {
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.textMain};
  }

  /* h1 */
  h1 {
    font-size: ${theme.fontSize.displayXl};
    letter-spacing: -1.68px;
    margin: 32px 0;
  }

  /* h2 */
  h2 {
    font-size: ${theme.fontSize.xxl};
    line-height: 1.18;
    letter-spacing: -0.24px;
    margin: 0 0 8px;
  }

  /* 문단 */
  p {
    margin: 0;
  }

  /* 코드 스타일 */
  code {
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    border-radius: ${theme.radius.sm};
    font-family: monospace;
    font-size: 15px;
    line-height: 1.35;
    background-color: ${theme.colors.gray100};
    color: ${theme.colors.textMain};
  }

  /* 폼 요소 */
  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  /* 버튼 기본 */
  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  /* 링크 */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* 이미지 */
  img {
    display: block;
    max-width: 100%;
  }

  /* 리스트 */
  ul,
  ol {
    list-style: none;
  }

  /* 반응형 */
  ${theme.media.tablet} {
    h1 {
      font-size: 36px;
      margin: 20px 0;
    }

    h2 {
      font-size: 20px;
    }
  }
`;

export default function GlobalStyle() {
  const theme = useTheme();
  return <Global styles={style(theme)} />;
}
