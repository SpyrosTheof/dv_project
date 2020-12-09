const express = require('express');
const router = express.Router();
const Category = require('../../../models/categories/Category');
const { SERVER_500_ERROR } = require('../../../shared/error_messages');
const auth = require('../../../middlewares/auth/auth');
const { check, validationResult } = require('express-validator');

//@route GET  api/categories
//@desc GET all categories
//@auth-access Public

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});

    return res.json(categories);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(SERVER_500_ERROR);
  }
});

//@route POST  api/categories
//@desc CREATE new category
//@auth-access Private

router.post(
  '/',
  [auth, [check('name', 'Name cannot be empty').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name } = req.body;

    try {
      const category = await Category.findOne({ name });

      if (category) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Category already exists',
            },
          ],
        });
      }

      const newCategory = new Category({ name });

      await newCategory.save();

      return res.json(newCategory);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send(SERVER_500_ERROR);
    }
  }
);

//@route DELETE  api/categories/:category_id
//@desc Delete Category
//@auth-access Private

router.delete('/:category_id', auth, async (req, res) => {
  try {
    //Remove Category
    const removeCategory = await Category.findOneAndRemove({
      _id: req.params.category_id,
    });

    if (!removeCategory) {
      return res.status(400).json({
        msg: 'No category found',
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
