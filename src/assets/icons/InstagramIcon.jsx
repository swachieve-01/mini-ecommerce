import React from "react";

const InstagramIcon = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100" // 0~100 기준으로 좌표를 설정하여 비율을 유지합니다.
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. 복합 그라디언트 정의 */}
      <defs>
        {/* 전체적인 선형 그라디언트 (보라~노랑) */}
        <linearGradient id="mainGradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C32AA3" /> {/* 보라 */}
          <stop offset="50%" stopColor="#DC2743" /> {/* 주황 */}
          <stop offset="100%" stopColor="#FFD521" /> {/* 노랑 */}
        </linearGradient>

        {/* 왼쪽 하단의 부드러운 빛 효과 (방사형 그라디언트) */}
        <radialGradient
          id="lightEffect"
          cx="10%"
          cy="100%"
          r="90%"
          fx="10%"
          fy="100%"
        >
          <stop offset="0%" stopColor="#405DE6" /> {/* 파랑 */}
          <stop offset="100%" stopColor="#405DE6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 2. 그라디언트가 적용된 원형 배경 */}
      <circle cx="50" cy="50" r="50" fill="url(#mainGradient)" />
      {/* 빛 효과 레이어 추가 */}
      <circle cx="50" cy="50" r="50" fill="url(#lightEffect)" />

      {/* 3. 하얀색 카메라 아이콘 부분 */}
      <g transform="translate(25, 25)">
        {" "}
        {/* 아이콘을 중앙으로 이동시킵니다. */}
        {/* 카메라 바디 (둥근 사각형) */}
        <rect
          x="1"
          y="1"
          width="48"
          height="48"
          rx="14" // 둥근 모서리 반지름
          stroke="white"
          strokeWidth="4"
        />
        {/* 카메라 렌즈 (중앙 원) */}
        <circle cx="25" cy="25" r="11" stroke="white" strokeWidth="4" />
        {/* 렌즈 상단 점 (작은 원) */}
        <circle cx="38" cy="12" r="3" fill="white" />
      </g>
    </svg>
  );
};

export default InstagramIcon;
