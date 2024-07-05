const express = require('express');
const router = express.Router();


router.get('/about', (req, res) => {
  const user=req.user;
  res.render('about',{user});
});

module.exports = router;