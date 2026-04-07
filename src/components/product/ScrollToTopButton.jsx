import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const TopButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 100px;

  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;

  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
  color: #4f6a4e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  opacity: 0.8;
  transform: translateY(10px) scale(0.95);

  cursor: pointer;
  transition: all 0.25s ease;

  z-index: 999;

  &:hover {
    opacity: 1;
    transform: translateY(0) scale(1);
    background: #8fa77e;
    color: #fff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
  }

  &:active {
    transform: scale(0.92);
  }
`;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <TopButton visible={visible} onClick={handleClick}>
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path
          d="M12 15V7M12 7L8 11M12 7L16 11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </TopButton>
  );
}
