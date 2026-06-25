const model = require("../models/forumModel");

// Главная страница — список игр
exports.index = (req, res) => {
  res.render("index", { games: model.games });
};

// Страница игры — список топиков
exports.gamePage = (req, res) => {
  const gameId = req.params.gameId;
  const game = model.games.find((g) => g.id === gameId);
  if (!game) return res.status(404).send("Игра не найдена");
  const gameTopics = model.topics.filter((t) => t.gameId === gameId);
  res.render("game", { game, topics: gameTopics });
};

// Страница конкретного топика — список постов
exports.topicPage = (req, res) => {
  const topicId = parseInt(req.params.topicId);
  const topic = model.topics.find((t) => t.id === topicId);
  if (!topic) return res.status(404).send("Топик не найден");
  const topicPosts = model.posts.filter((p) => p.topicId === topicId);
  res.render("topic", { topic, posts: topicPosts });
};

// Форма создания нового топика
exports.newTopicForm = (req, res) => {
  const gameId = req.params.gameId;
  const game = model.games.find((g) => g.id === gameId);
  if (!game) return res.status(404).send("Игра не найдена");
  res.render("newTopic", { game });
};

// Обработка создания топика
exports.createTopic = (req, res) => {
  const gameId = req.params.gameId;
  const { title, content } = req.body;
  const newTopic = {
    id: model.topicIdCounter++,
    gameId,
    title,
    createdAt: new Date(),
  };
  model.topics.push(newTopic);
  // Первый пост в топике
  model.posts.push({
    id: model.postIdCounter++,
    topicId: newTopic.id,
    content,
    createdAt: new Date(),
  });
  res.redirect(`/game/${gameId}`);
};

// Обработка добавления поста в существующий топик
exports.createPost = (req, res) => {
  const topicId = parseInt(req.params.topicId);
  const topic = model.topics.find((t) => t.id === topicId);
  if (!topic) return res.status(404).send("Топик не найден");
  model.posts.push({
    id: model.postIdCounter++,
    topicId,
    content: req.body.content,
    createdAt: new Date(),
  });
  res.redirect(`/topic/${topicId}`);
};
