const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware');
const PostsController = require('../controllers/post-controller');

const firebaseAuthController = require('../controllers/firebase-auth-controller');

router.post('/api/register', firebaseAuthController.registerUser);
router.post('/api/login', firebaseAuthController.loginUser);
router.post('/api/logout', firebaseAuthController.logoutUser);
// router.post('/api/reset-password', firebaseAuthController.resetPassword);
 

router.get('/api/posts', verifyToken, PostsController.getPosts);
module.exports = router;