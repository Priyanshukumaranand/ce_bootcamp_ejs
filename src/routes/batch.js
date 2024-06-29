const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware } = require('../middleware/jwt');


router.get('/batch', jwtAuthMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.render('batch.ejs', { users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;