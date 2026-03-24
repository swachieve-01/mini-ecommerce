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
    height: 100%;
  }

  body {
    font-family:
      "Pretendard",
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
    line-height: 1.5;

    /* 배경 & 텍스트 */
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};

    /* 모바일 대응 (vh 문제 해결) */
    min-height: 100dvh;

    /* 폰트 렌더링 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 폼 요소 */
  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    max-width: 100%;
  }

  ul,
  ol {
    list-style: none;
  }
`;

function GlobalStyle() {
  const theme = useTheme();
  return <Global styles={style(theme)} />;
}

export default GlobalStyle;
