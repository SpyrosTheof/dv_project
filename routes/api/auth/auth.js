const express = require('express');
const router = express.Router();
const User = require('../../../models/users/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { SERVER_500_ERROR } = require('../../../shared/error_messages');

const auth = require('../../../middlewares/auth/auth');

//@route POST  api/auth
//@desc Login User & get Token
//@auth-access Public

router.post(
  '/',
  [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        });
      }

      //send back jwt token
      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send(SERVER_500_ERROR);
    }
  }
);

module.exports = router;
