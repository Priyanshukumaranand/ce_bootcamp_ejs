const express = require('express');
const router = express.Router();

router.get('/error404', (req, res) => {
  res.render('servererror');
});

module.exports = router;