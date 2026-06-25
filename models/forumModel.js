// Просто массив игр-разделов
const games = [
  { id: "cyberpunk", name: "Cyberpunk 2077" },
  { id: "witcher", name: "The Witcher 3" },
  { id: "minecraft", name: "Minecraft" },
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
