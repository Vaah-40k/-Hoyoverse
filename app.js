const express = require('express');
const app = express();
const forumRoutes = require('./routes/forumRoutes');
const path = require('path');

app.set('view engine', 'ejs');

// Парсинг форм (для текстовых полей)
app.use(express.urlencoded({ extended: true }));
// Статические файлы (включая загруженные медиа)
app.use(express.static('public'));

// Подключаем маршруты
app.use('/', forumRoutes);

app.listen(3000, () => {
  console.log('Форум запущен на http://localhost:3000');
});