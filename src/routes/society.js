const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/society', (req, res) => {
  const user=req.user;
  res.render('society',{user});
});

module.exports = router;