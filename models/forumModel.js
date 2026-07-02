// Просто массив игр-разделов
const games = [
  { id: "genshinimpact", name: "Genshin Impact" },
  { id: "honkaistarrail ", name: "Honkai: Star Rail" },
  { id: "zenlesszonezero", name: "Zenless Zone Zero" },
  { id: "honkaiimpact3rd", name: "Honkai Impact 3rd" },
  { id: "Tears of Themis", name: "Tears of Themis" },
];

// Здесь будем хранить все топики и посты
let topics = [];
let posts = [];
let topicIdCounter = 1;
let postIdCounter = 1;

module.exports = {
  games,
  topics,
  posts,
  topicIdCounter,
  postIdCounter,
};
