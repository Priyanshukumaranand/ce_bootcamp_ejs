const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
  const userjwt=req.cookies.jwt ;
  const usergoog=req.user ;
  res.render('homepage',{userjwt,usergoog});
});

module.exports = router;