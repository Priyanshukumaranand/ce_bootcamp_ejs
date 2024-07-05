const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware } = require('../middleware/jwt');


router.get('/batch', jwtAuthMiddleware, async (req, res) => {
  try {
    const users = await User.find().sort('email');
    const userjwt=req.cookies.jwt ;
  const usergoog=req.user ;
    res.render('batch.ejs', { users ,userjwt,usergoog});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/batch2027', jwtAuthMiddleware, async (req, res) => {
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
router.get('/batch2028', jwtAuthMiddleware, async (req, res) => {
  try {
    const users = await User.find().sort('email');
    const userjwt=req.cookies.jwt ;
  const usergoog=req.user ;
    res.render('batch2028.ejs', { users ,userjwt,usetgoog});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;