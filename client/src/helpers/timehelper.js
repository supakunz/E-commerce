export const timehelper = (time) => {
  // แปลง UNIX timestamp เป็น Date object
  const timestamp = time || 1733886552;
  const date = new Date(timestamp * 1000); // timestamp ใน JS จะต้องคูณด้วย 1000 เพื่อให้ได้เป็น milliseconds

  console.log(time);

  // ตั้งค่ารูปแบบที่ต้องการ
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
};
