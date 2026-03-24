import React from "react";

const FacebookIcon = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 47 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 배경 원 */}
      <circle cx="23.5" cy="23.5" r="23.5" fill="#1877F2" />

      {/* 페이스북 'f' 로고 - transform을 통해 중앙으로 이동 */}
      <path
        d="M29.2386 17.1818V20.5909H26.5c-1.5 0-2 .5-2 1.5V25.5h4.5l-.5 4h-4V39h-5V29.5h-3v-4h3V22.5c0-3.5 2-5.5 5.5-5.5 1.5 0 2.5.2 2.5.2z"
        fill="white"
        transform="translate(2, 0)"
      />
    </svg>
  );
};

export default FacebookIcon;
