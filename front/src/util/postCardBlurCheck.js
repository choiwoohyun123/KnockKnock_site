export const postCardBlurCheck = (currentTime, meetingTime) => {
  const adjustedMeetingTime = new Date(
    Date.parse(meetingTime) + 9 * 60 * 60 * 1000
  );
  const currentDate = new Date(currentTime.replace(" ", "T") + ":00Z");
  return currentDate >= adjustedMeetingTime;
};
