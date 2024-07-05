const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
  user=req.user;
  res.render('homepage',{user});
});

module.exports = router;