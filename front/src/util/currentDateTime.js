export const currentDate = new Date()
  .toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replace(/\. /g, "-")
  .replace(/\.$/g, "");
export const currentTime = new Date().toLocaleTimeString("ko-KR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
