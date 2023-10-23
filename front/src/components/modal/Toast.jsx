import { useEffect } from "react";

function Toast({ setToast, text }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div>
      <p>{text}</p> // 재사용성을 위해 토스트의 내용도 prop로 내려줌
    </div>
  );
}

export default Toast;
