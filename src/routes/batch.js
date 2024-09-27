const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware } = require('../middleware/jwt');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

router.get('/batch', limiter, jwtAuthMiddleware, async (req, res) => {
  try {
    const users = await User.find().sort('email');
    const userjwt=req.cookies.jwt ;
  const usergoog=req.user ;
  const branchupgrade=['b222003@iiit-bh.ac.in']
    res.render('batch.ejs', { users ,userjwt,usergoog,branchupgrade});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/batch2027', limiter, jwtAuthMiddleware, async (req, res) => {
  try {
    const users = await User.find().sort('email');
    const userjwt=req.cookies.jwt ;
    const usergoog=req.user ;
    res.render('batch2027.ejs', { users ,userjwt,usergoog});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/batch2028', limiter, jwtAuthMiddleware, async (req, res) => {
  try {
    const users = await User.find().sort('email');
    const userjwt=req.cookies.jwt ;
  const usergoog=req.user ;
    res.render('batch2028.ejs', { users ,userjwt,usergoog});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;