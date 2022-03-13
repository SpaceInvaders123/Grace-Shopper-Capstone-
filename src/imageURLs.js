export const sockUrls = [
  "https://i.imgur.com/HiU6Aihl.png",
  "https://i.imgur.com/aqqqXS0l.png",
  "https://i.imgur.com/0nfqEdAl.png",
  "https://i.imgur.com/IZh4rfVl.png",
  "https://i.imgur.com/OnRDeZ5l.png",
];

export const getRandomSockUrl = () => {
  return sockUrls[Math.floor(Math.random() * sockUrls.length)];
};
