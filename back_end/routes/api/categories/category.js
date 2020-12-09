const express = require('express');
const router = express.Router();

//@route GET  api/categories
//@desc GET all categories
//@auth-access Public

router.get('/', async (req, res) => {
  res.send('ALL CATEGORIES');
});

module.exports = router;
