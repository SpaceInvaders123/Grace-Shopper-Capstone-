export const sockUrls = [
  "https://i.imgur.com/HfEls2wh.png",
  "https://i.imgur.com/jkSzrTzh.png",
  "https://i.imgur.com/bSICAJ1h.png",
  "https://i.imgur.com/I3h729Yh.png",
  "https://i.imgur.com/5gpC9Q9h.png",
  "https://i.imgur.com/yavFkOGh.png",
  "https://i.imgur.com/TyGAIFHh.png",
  "https://i.imgur.com/0fax8zth.png",
  "https://i.imgur.com/lS2CtBmh.png",
  "https://i.imgur.com/FEcY5qCh.jpg",
  "https://i.imgur.com/WDy1C0jh.jpg",
  "https://i.imgur.com/j0rxoS9h.jpg?1",
  "https://i.imgur.com/tNA7jsPh.png",
  "https://i.imgur.com/scn7jvDh.png",
  "https://i.imgur.com/PJitTFah.png",
  "https://i.imgur.com/WCWLZxwh.png",
  "https://i.imgur.com/avAiDkwh.png",
  "https://i.imgur.com/sS8wLt2h.png",
  "https://i.imgur.com/JOGx2UXh.jpg",
  "https://i.imgur.com/Xycw6Nxh.jpg",
];

export const getRandomSockUrl = () => {
  return sockUrls[Math.floor(Math.random() * sockUrls.length)];
};
