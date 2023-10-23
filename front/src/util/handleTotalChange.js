export const handleTotalChange = (setValueFunction) => (e) => {
  const value = parseInt(e.target.value, 10);
  if (!isNaN(value)) {
    setValueFunction(value);
  } else {
    setValueFunction(""); // NaN인 경우 값을 비워줌
  }
};
