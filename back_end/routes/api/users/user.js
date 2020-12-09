const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../../models/users/User');
const { SERVER_500_ERROR } = require('../../../shared/error_messages');

//@route POST  api/users
//@desc Register User
//@auth-access Public

router.post(
  '/',
  [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password must have at least 6 characters').isLength({
      min: 6,
    }),
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

      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'User already exists',
            },
          ],
        });
      }

      // Get Users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        email,
        avatar,
        password,
      });

      //Encrypt password

      const salt = await bcrypt.genSalt();

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //send back jwt token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
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
