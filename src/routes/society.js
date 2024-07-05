const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/society', (req, res) => {
  
  const userjwt=req.cookies.jwt ;
  const usergoog=req.user ;
  res.render('society',{userjwt,usergoog});
});

module.exports = router;