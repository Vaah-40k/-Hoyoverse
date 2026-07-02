const model = require("../models/forumModel");
const multer = require("multer");
const path = require("path");

// Настройка хранения загруженных файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Middleware для одного файла (поле "media")
const uploadSingle = upload.single("media");

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

// Обработка создания топика (с загрузкой файла)
exports.createTopic = (req, res) => {
  uploadSingle(req, res, (err) => {
    if (err) return res.status(500).send("Ошибка загрузки файла");

    const gameId = req.params.gameId;
    const { title, content } = req.body;
    const filePath = req.file ? "/uploads/" + req.file.filename : null;

    const newTopic = {
      id: model.topicIdCounter++,
      gameId,
      title,
      createdAt: new Date(),
    };
    model.topics.push(newTopic);

    // Первый пост в топике (может содержать медиа)
    model.posts.push({
      id: model.postIdCounter++,
      topicId: newTopic.id,
      content,
      media: filePath,
      createdAt: new Date(),
    });

    res.redirect(`/game/${gameId}`);
  });
};

// Обработка добавления поста (с загрузкой файла)
exports.createPost = (req, res) => {
  uploadSingle(req, res, (err) => {
    if (err) return res.status(500).send("Ошибка загрузки файла");

    const topicId = parseInt(req.params.topicId);
    const topic = model.topics.find((t) => t.id === topicId);
    if (!topic) return res.status(404).send("Топик не найден");

    const filePath = req.file ? "/uploads/" + req.file.filename : null;

    model.posts.push({
      id: model.postIdCounter++,
      topicId,
      content: req.body.content,
      media: filePath,
      createdAt: new Date(),
    });

    res.redirect(`/topic/${topicId}`);
  });
};