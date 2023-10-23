import { useState, useEffect } from "react";

export const useToggle = (initialValue) => {
  const [value, setValue] = useState();

  const handleOpen = () => {
    setValue(!value);
  };

  const handleClose = () => {
    setValue(false);
  };

  const handleToggle = (value) => {
    setValue(initialValue);
  };

  useEffect(() => {
    setValue(value);
  }, [initialValue]);

  return {
    opened: value,
    onOpen: handleOpen,
    onClose: handleClose,
    onToggle: handleToggle,
  };
};
