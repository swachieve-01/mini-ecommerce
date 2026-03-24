import React from "react";

const YoutubeIcon = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 배경 원 (유튜브 브랜드 레드) */}
      <circle cx="23.5" cy="23.5" r="23.5" fill="#FF0000" />

      {/* 재생 버튼 삼각형 - 중앙 정렬 최적화 */}
      <path
        d="M37 23.5L16 35.6244L16 11.3756L37 23.5Z"
        fill="white"
        transform="translate(1, 0)"
      />
    </svg>
  );
};

export default YoutubeIcon;
