const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/society', (req, res) => {
  res.render('society');
});

module.exports = router;