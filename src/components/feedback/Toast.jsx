import React from "react";
import styled from "@emotion/styled";
import useToastStore from "../../stores/useToastStore";

const ToastContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 30px;
  border-radius: 8px;
  background-color: ${(props) => (props.type === "error" ? "#FF4D4F" : "#333")};
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.6s ease;
`;

export default function Toast() {
  const isVisible = useToastStore((state) => state.isVisible);
  const message = useToastStore((state) => state.message);

  if (!isVisible) return null;

  return (
    <ToastContainer>
      <span style={{ fontSize: "15px", fontWeight: 500 }}>{message}</span>
    </ToastContainer>
  );
}
