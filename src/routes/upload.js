const express = require("express");
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const User = require('../models/user');

const router = express.Router();

// const storage = multer.diskStorage({
// //   destination: './uploads/',
// destination: path.join(__dirname, '../uploads/'),
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });


// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 3000000 }, // Limit file size to 3MB
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   }
// });

// function checkFileType(file, cb) {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Images Only!');
//   }
// }

router.post('/upload', (req, res) => {
  
});

module.exports = router;
