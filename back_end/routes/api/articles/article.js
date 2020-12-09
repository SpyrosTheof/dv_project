const express = require('express');
const router = express.Router();
const Article = require('../../../models/articles/Article');
const { SERVER_500_ERROR } = require('../../../shared/error_messages');

//@route GET  api/articles
//@desc GET all articles
//@auth-access Public

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find({}).populate('categories', ['name']);

    return res.json(articles);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(SERVER_500_ERROR);
  }
});

module.exports = router;
