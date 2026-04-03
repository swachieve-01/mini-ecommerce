import { useState, useRef, useCallback } from "react";

export function useToast() {
  const [toast, setToast] = useState({
    show: false,
    visible: false,
    message: "",
  });

  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  const trigger = useCallback((msg) => {
    clearTimers();

    setToast({ show: true, visible: false, message: msg });

    timers.current.push(
      setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: true }));
      }, 10),
    );

    timers.current.push(
      setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 1800),
    );

    timers.current.push(
      setTimeout(() => {
        setToast({ show: false, visible: false, message: "" });
      }, 2200),
    );
  }, []);

  const ToastUI = () =>
    toast.show ? (
      <div
        style={{
          position: "fixed",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "14px 20px",
          background: "rgba(143,167,126,0.9)",
          color: "#fff",
          borderRadius: "12px",
          opacity: toast.visible ? 1 : 0,
          transition: "all 0.3s ease",
          zIndex: 99999,
        }}
      >
        {toast.message}
      </div>
    ) : null;

  return { trigger, ToastUI };
}
