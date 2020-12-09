const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Article = require('../../../models/articles/Article');
const { SERVER_500_ERROR } = require('../../../shared/error_messages');
const auth = require('../../../middlewares/auth/auth');

//@route GET  api/articles
//@desc GET all articles
//@auth-access Public

router.get('/all/', async (req, res) => {
  try {
    const articles = await Article.find({}).populate('category', ['name']);
    return res.json(articles);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(SERVER_500_ERROR);
  }
});

//@route GET  api/articles/:category_id
//@desc GET articles per category
//@auth-access Public

router.get('/category/:category_id', async (req, res) => {
  try {
    const articlesPerCategory = await Article.find({
      category: req.params.category_id,
    }).populate('category', ['name']);
    return res.json(articlesPerCategory);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(SERVER_500_ERROR);
  }
});

//@route GET  api/articles/no_content
//@desc GET articles without content
//@auth-access Public

router.get('/all/no_content', async (req, res) => {
  try {
    const articlesWithoutContent = await Article.find({})
      .select('-content')
      .populate('category', ['name']);
    return res.json(articlesWithoutContent);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(SERVER_500_ERROR);
  }
});

//@route GET  api/articles/:article_id/:payload?
//@desc GET single article
//@auth-access Public
//here I use optional parameter . I wanted to demostrate both ways of filtering in this project .

router.get('/:article_id/:payload?', async (req, res) => {
  try {
    const payload = req.params.payload;
    if (payload == 'true') {
      const singleArticle = await Article.findOne({
        _id: req.params.article_id,
      }).populate('category', ['name']);
      return res.json(singleArticle);
    }
    const singleArticle = await Article.findOne({
      _id: req.params.article_id,
    })
      .select('-content')
      .populate('category', ['name']);
    return res.json(singleArticle);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(SERVER_500_ERROR);
  }
});

//@route POST  api/articles
//@desc CREATE new article with required title,content,category and optional description
//@auth-access Private

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title cannot be empty').not().isEmpty(),
      check('content', 'Content cannot be empty').not().isEmpty(),
      check('category', 'Category cannot be empty').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { title, content, description, date, category } = req.body;

    console.log(req.body);

    const articleFields = {};
    title && (articleFields.title = title);
    content && (articleFields.content = content);
    description && (articleFields.description = description);
    date && (articleFields.date = date);
    category && (articleFields.category = category);

    try {
      const article = new Article(articleFields);

      await article.save();

      return res.json(article);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(SERVER_500_ERROR);
    }
  }
);
//@route POST  api/articles/:article_id
//@desc GET single article
//@auth-access Public

router.post(
  '/:article_id',
  [auth, [check('content', 'Content is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { content } = req.body;
    const updatedArticle = { content: content };

    try {
      let article = await Article.findOneAndUpdate(
        { _id: req.params.article_id },
        {
          $set: updatedArticle,
        },
        {
          new: true,
        }
      );

      if (!article) {
        return res.status(400).json({
          msg: 'No article was found',
        });
      }

      return res.json(article);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(SERVER_500_ERROR);
    }
  }
);

//@route POST  api/articles/:article_id
//@desc DELETE single article
//@auth-access Private

router.delete('/:article_id', auth, async (req, res) => {
  try {
    const articleForDeletion = await Article.findOneAndRemove({
      _id: req.params.article_id,
    });

    if (!articleForDeletion) {
      return res.status(400).json({
        msg: 'No article was found',
      });
    }

    return res.json({
      msg: 'Successful Deletion',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(SERVER_500_ERROR);
  }
});

module.exports = router;
