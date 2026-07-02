const express = require("express");
const router = express.Router();
const controller = require("../controllers/forumController");

router.get("/", controller.index);
router.get("/game/:gameId", controller.gamePage);
router.get("/game/:gameId/new", controller.newTopicForm);
router.post("/game/:gameId", controller.createTopic);
router.get("/topic/:topicId", controller.topicPage);
router.post("/topic/:topicId", controller.createPost);

module.exports = router;