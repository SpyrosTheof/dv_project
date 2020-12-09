require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const articles = require('./routes/api/articles/article');
const categories = require('./routes/api/categories/category');
const users = require('./routes/api/users/user');
const auth = require('./routes/api/auth/auth');
var cors = require('cors');

app.use(cors());

connectDB();
app.use(
  express.json({
    extended: false,
  })
);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API running'));

//match up router modules
app.use('/api/articles', articles);
app.use('/api/categories', categories);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}`);
});
