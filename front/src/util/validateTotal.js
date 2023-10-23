export const validateTotal = (totalM, totalF) => {
  if (totalM <= 0 || totalM >= 6 || totalF <= 0 || totalF >= 6) {
    return "남자와 여자의 수는 1~5 사이의 값이어야 합니다.";
  }
  return null;
};
