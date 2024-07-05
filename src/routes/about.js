const express = require('express');
const router = express.Router();


router.get('/about', (req, res) => {
  // console.log(req.cookies);
  const userjwt=req.cookies.jwt ;
  const usergoog=req.user ;
  
  res.render('about',{userjwt,usergoog});
});

module.exports = router;