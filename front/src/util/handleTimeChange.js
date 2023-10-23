export const handleTimeChange =
  (meetingDate, currentDate, currentTime, setMeetingHour) => (e) => {
    const selectedTime = e.target.value;
    const currentHour = parseInt(currentTime.split(":")[0]);
    const currentMinutes = parseInt(currentTime.split(":")[1]);
    const selectedHour = parseInt(selectedTime.split(":")[0]);
    const selectedMinutes = parseInt(selectedTime.split(":")[1]);

    if (
      meetingDate === currentDate &&
      (selectedHour < currentHour ||
        (selectedHour === currentHour && selectedMinutes < currentMinutes))
    ) {
      alert("현재 시간 이전은 선택할 수 없습니다.");
      return;
    }

    setMeetingHour(selectedTime);
  };
