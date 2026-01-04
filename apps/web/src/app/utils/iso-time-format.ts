export const isoTimeFormat = (timeString: string) => {
  const [hour, minute] = timeString.split(':').map(Number);

  // Tạo date giả với ngày bất kỳ
  const date = new Date(2000, 0, 1, hour, minute);
  const localTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return localTime;
};
