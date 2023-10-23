import moment from "moment";

export const timeAgo = (timestamp) => {
  const now = moment();
  const time = moment(timestamp);
  const diffMinutes = now.diff(time, "minutes");
  const diffHours = now.diff(time, "hours");
  const diffDays = now.diff(time, "days");
  const diffMonths = now.diff(time, "months");
  const diffYears = now.diff(time, "years");

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else if (diffDays < 30) {
    return `${diffDays}일 전`;
  } else if (diffMonths < 12) {
    return `${diffMonths}달 전`;
  } else {
    return `${diffYears}년 전`;
  }
};
