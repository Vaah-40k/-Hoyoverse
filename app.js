const express = require('express');
const app = express();
const forumRoutes = require('./routes/forumRoutes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', forumRoutes);

app.listen(3000, () => {
  console.log('Форум запущен на http://localhost:3000');
});
